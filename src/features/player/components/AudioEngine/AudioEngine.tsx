import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { getSharedAudioElement } from '@/shared/audio';
import { playAudioSafely } from '../../utils/audioPlaybackUtils';
import { useAutoPrefetch } from '../../hooks/useAutoPrefetch';

export const AudioEngine = () => {
	// Store 상태를 개별 selector로 가져오기 (객체 반환 시 무한 루프 방지)
	const getCurrentTrack = usePlayerStore((state) => state.getCurrentTrack);
	const isPlaying = usePlayerStore((state) => state.isPlaying);
	const volume = usePlayerStore((state) => state.volume);
	const currentTime = usePlayerStore((state) => state.currentTime);
	const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
	const setDuration = usePlayerStore((state) => state.setDuration);
	const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
	const moveToNextTrack = usePlayerStore((state) => state.moveToNextTrack);

	const currentTrack = getCurrentTrack();
	const audioRef = useRef<HTMLAudioElement | null>(getSharedAudioElement());
	const lastTimeFromAudioRef = useRef(0);
	const rafIdRef = useRef<number | null>(null);
	const previousIsPlayingRef = useRef(isPlaying);
	const fadeAnimationRef = useRef<number | null>(null);
	const previousTrackIdRef = useRef<string | null>(null);

	// 자동 프리페치 훅 사용
	useAutoPrefetch(currentTrack, currentTime, audioRef);

	// Initialize audio element
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) {
			return;
		}

		const handleLoadedMetadata = () => {
			if (isFinite(audio.duration)) {
				setDuration(audio.duration);
			}
		};

		const handleTimeUpdate = () => {
			lastTimeFromAudioRef.current = audio.currentTime;
			setCurrentTime(audio.currentTime);
		};

		const handleEnded = () => {
			moveToNextTrack();
		};

		const handleError = () => {
			setIsPlaying(false);
		};

		audio.addEventListener('loadedmetadata', handleLoadedMetadata);
		audio.addEventListener('timeupdate', handleTimeUpdate);
		audio.addEventListener('ended', handleEnded);
		audio.addEventListener('error', handleError);

		return () => {
			audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
			audio.removeEventListener('timeupdate', handleTimeUpdate);
			audio.removeEventListener('ended', handleEnded);
			audio.removeEventListener('error', handleError);
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
			if (fadeAnimationRef.current !== null) {
				cancelAnimationFrame(fadeAnimationRef.current);
				fadeAnimationRef.current = null;
			}
		};
	}, [setCurrentTime, setDuration, setIsPlaying, moveToNextTrack]);

	// Handle track changes with fade-out/fade-in
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		if (currentTrack?.audioUrl) {
			const audioTrackId = audio.dataset.trackId || null;
			const isNewTrack = currentTrack.id !== audioTrackId;

			if (isNewTrack) {
				// 기존 fade 애니메이션 취소
				if (fadeAnimationRef.current !== null) {
					cancelAnimationFrame(fadeAnimationRef.current);
					fadeAnimationRef.current = null;
				}

				// 이전 트랙이 있으면 fade-out
				if (previousTrackIdRef.current && previousTrackIdRef.current !== currentTrack.id && !audio.paused) {
					const fadeOutDuration = 1000; // 1초
					const startTime = performance.now();
					const startVolume = audio.volume;

					const fadeOut = (currentTime: number) => {
						const elapsed = currentTime - startTime;
						const progress = Math.min(elapsed / fadeOutDuration, 1);

						// 선형 fade-out (볼륨 범위 제한)
						if (audio) {
							const newVolume = startVolume * (1 - progress);
							audio.volume = Math.max(0, Math.min(1, newVolume));
						}

						if (progress < 1) {
							fadeAnimationRef.current = requestAnimationFrame(fadeOut);
						} else {
							if (audio) {
								audio.volume = 0;
								audio.pause();
							}
							fadeAnimationRef.current = null;

							// fade-out 완료 후 새 트랙 로드
							loadAndPlayNewTrack();
						}
					};

					fadeAnimationRef.current = requestAnimationFrame(fadeOut);
				} else {
					// 이전 트랙이 없거나 일시정지 상태면 바로 새 트랙 로드
					loadAndPlayNewTrack();
				}

				function loadAndPlayNewTrack() {
					if (!audio || !currentTrack?.audioUrl) return;

					audio.src = currentTrack.audioUrl;
					audio.dataset.trackId = currentTrack.id;
					audio.currentTime = 0;
					lastTimeFromAudioRef.current = 0;

					// 명시적으로 로드 시작 (최적화)
					audio.load();

					// 트랙이 변경되면 항상 자동 재생
					previousIsPlayingRef.current = true;

					// fade-in 시작
					audio.volume = 0;
					playAudioSafely(audio, () => setIsPlaying(false));

					// fade-in 애니메이션
					const targetVolume = volume / 100;
					const fadeInDuration = 1000; // 1초
					const startTime = performance.now();

					const fadeIn = (currentTime: number) => {
						const elapsed = currentTime - startTime;
						const progress = Math.min(elapsed / fadeInDuration, 1);

						// 선형 fade-in (볼륨 범위 제한)
						if (audio) {
							const newVolume = targetVolume * progress;
							audio.volume = Math.max(0, Math.min(1, newVolume));
						}

						if (progress < 1) {
							fadeAnimationRef.current = requestAnimationFrame(fadeIn);
						} else {
							if (audio) {
								audio.volume = Math.max(0, Math.min(1, targetVolume));
							}
							fadeAnimationRef.current = null;
						}
					};

					fadeAnimationRef.current = requestAnimationFrame(fadeIn);
				}

				previousTrackIdRef.current = currentTrack.id;
			} else if (isPlaying && audio.paused) {
				// 같은 트랙이지만 isPlaying이 true이고 audio가 일시정지 상태인 경우 재생
				playAudioSafely(audio, () => setIsPlaying(false));
			}
		} else {
			// fade 애니메이션 취소
			if (fadeAnimationRef.current !== null) {
				cancelAnimationFrame(fadeAnimationRef.current);
				fadeAnimationRef.current = null;
			}

			audio.pause();
			audio.removeAttribute('src');
			audio.load();
			audio.dataset.trackId = '';
			setIsPlaying(false);
			previousTrackIdRef.current = null;
		}
	}, [currentTrack, isPlaying, setIsPlaying, volume]);

	// Play/Pause control (isPlaying 상태 변경 시에만 처리)
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || !currentTrack?.audioUrl) return;

		// 트랙이 변경되지 않았을 때만 재생/일시정지 처리
		const audioTrackId = audio.dataset.trackId || null;
		if (currentTrack.id !== audioTrackId) {
			return; // 트랙 변경 중이면 무시 (Handle track changes에서 처리)
		}

		if (isPlaying) {
			playAudioSafely(audio, () => setIsPlaying(false));
		} else {
			audio.pause();
		}

		previousIsPlayingRef.current = isPlaying;
	}, [isPlaying, currentTrack, setIsPlaying]);

	// Volume control (fade 중이 아닐 때만 적용)
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		// fade 애니메이션 중이 아니면 볼륨 업데이트
		if (fadeAnimationRef.current === null) {
			audio.volume = Math.min(1, Math.max(0, volume / 100));
		}
	}, [volume]);

	// Smooth progress updates while playing
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const tick = () => {
			setCurrentTime(audio.currentTime);
			rafIdRef.current = requestAnimationFrame(tick);
		};

		if (isPlaying) {
			rafIdRef.current = requestAnimationFrame(tick);
		} else if (rafIdRef.current !== null) {
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = null;
		}

		return () => {
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
		};
	}, [isPlaying, setCurrentTime]);

	// Sync external seeks
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		if (!Number.isFinite(currentTime)) return;

		const diff = Math.abs(audio.currentTime - currentTime);
		if (diff > 0.25) {
			audio.currentTime = currentTime;
		}
	}, [currentTime]);

	return null;
};
