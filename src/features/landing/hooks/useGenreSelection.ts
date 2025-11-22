import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '@/store/playerStore';
import type { MusicGenre, Track } from '@/shared/types';

/**
 * 장르 선택 및 음악 생성 API 호출을 관리하는 커스텀 훅
 */
export const useGenreSelection = () => {
	const navigate = useNavigate();
	const setSelectedGenre = usePlayerStore((state) => state.setSelectedGenre);
	const setCurrentTrack = usePlayerStore((state) => state.setCurrentTrack);

	const cancelApiCallRef = useRef<(() => void) | null>(null);
	const apiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const isCancelledRef = useRef<boolean>(false);

	const handleGenreSelect = useCallback(
		async (genre: MusicGenre, setIsTransitioning: (value: boolean) => void) => {
			setIsTransitioning(true);
			setSelectedGenre(genre);
			isCancelledRef.current = false;

			// 취소 함수를 ref에 저장
			cancelApiCallRef.current = () => {
				isCancelledRef.current = true;
				if (apiTimeoutRef.current) {
					clearTimeout(apiTimeoutRef.current);
					apiTimeoutRef.current = null;
				}
				setIsTransitioning(false);
				cancelApiCallRef.current = null;
			};

			try {
				// AI API 호출 시뮬레이션 (5초) - 취소 가능하도록 구현
				const musicResponse = await new Promise<{ trackId: string; audioUrl: string; duration: number }>((resolve) => {
					// TODO: 실제 API 호출로 교체
					// const abortController = new AbortController();
					// const response = await fetch('/api/music/generate', {
					//   method: 'POST',
					//   headers: { 'Content-Type': 'application/json' },
					//   body: JSON.stringify({ genre: genre.id, params: audioParams }),
					//   signal: abortController.signal
					// });
					// const data = await response.json();

					apiTimeoutRef.current = setTimeout(() => {
						if (!isCancelledRef.current) {
							resolve({
								trackId: `track-${genre.id}-${Date.now()}`,
								audioUrl: '', // 실제 API 응답에서 받아올 URL
								duration: 180, // 3분
							});
							apiTimeoutRef.current = null;
						}
					}, 5000);
				});

				if (isCancelledRef.current) {
					return;
				}

				// API 응답을 Track 형태로 변환하여 playerStore에 저장
				const track: Track = {
					id: musicResponse.trackId,
					title: genre.name,
					genre: genre.name,
					genreKo: genre.nameKo,
					audioUrl: musicResponse.audioUrl,
					duration: musicResponse.duration,
					status: 'ready',
					params: {
						energy: 50,
						bass: 50,
						tempo: 80,
					},
					createdAt: new Date(),
				};
				setCurrentTrack(track);

				// 부드러운 전환을 위한 짧은 딜레이
				await new Promise((resolve) => setTimeout(resolve, 300));
				if (!isCancelledRef.current) {
					cancelApiCallRef.current = null;
					navigate('/player');
				}
			} catch (error) {
				if (!isCancelledRef.current) {
					console.error('음악 생성 실패:', error);
					setIsTransitioning(false);
					cancelApiCallRef.current = null;
				}
			}
		},
		[navigate, setSelectedGenre, setCurrentTrack]
	);

	const handleCancelApiCall = useCallback(() => {
		if (cancelApiCallRef.current) {
			cancelApiCallRef.current();
		}
	}, []);

	return {
		handleGenreSelect,
		handleCancelApiCall,
	};
};
