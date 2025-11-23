/**
 * Audio 재생 관련 유틸리티 함수
 */

/**
 * audio 요소가 재생 가능한 상태인지 확인
 */
export const isAudioReady = (audio: HTMLAudioElement): boolean => {
	return audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
};

/**
 * audio 요소를 안전하게 재생 (메타데이터 로드 후 재생)
 * loadedmetadata 이벤트를 먼저 확인하고, 필요시 canplay 이벤트 대기
 */
export const playAudioSafely = (audio: HTMLAudioElement, onError: () => void): void => {
	const handlePlay = () => {
		audio.play().catch(() => {
			onError();
		});
	};

	// 메타데이터가 이미 로드된 경우
	if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
		// 재생 가능한 상태면 즉시 재생, 아니면 canplay 대기
		if (isAudioReady(audio)) {
			handlePlay();
		} else {
			audio.addEventListener('canplay', handlePlay, { once: true });
		}
	} else {
		// 메타데이터 로드 대기 후 재생 가능 상태 확인
		const handleLoadedMetadata = () => {
			audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
			if (isAudioReady(audio)) {
				handlePlay();
			} else {
				audio.addEventListener('canplay', handlePlay, { once: true });
			}
		};
		audio.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
	}
};
