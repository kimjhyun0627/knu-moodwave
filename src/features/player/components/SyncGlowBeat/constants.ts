/**
 * SyncGlowBeat 컴포넌트 관련 상수
 */

export const BOX_CONSTANTS = {
	// 박스 기본 크기
	INTENSITY_BOX_BASE_SIZE: 6, // vh
	BEAT_BOX_BASE_SIZE: 3, // vh

	// 박스 idle 상태 크기
	INTENSITY_IDLE_SIZE: 6, // vh
	BEAT_IDLE_SIZE: 2, // vh

	// 박스 최대 확장 크기
	INTENSITY_MAX_EXTRA: 10, // vh
	BEAT_MAX_EXTRA: 6, // vh

	// 박스 초기 투명도
	INTENSITY_INITIAL_OPACITY: 0.3,
	BEAT_INITIAL_OPACITY: 0.2,

	// 이미지 투명도
	IMAGE_OPACITY_DARK: 0.85,
	IMAGE_OPACITY_LIGHT: 0.95,

	// 색상 RGB 값
	COLOR_RGB_DARK: '251, 113, 133',
	COLOR_RGB_LIGHT: '200, 60, 90',
} as const;
