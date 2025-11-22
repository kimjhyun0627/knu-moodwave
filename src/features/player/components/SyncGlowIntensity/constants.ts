/**
 * SyncGlowIntensity 컴포넌트 관련 상수
 */

export const INTENSITY_BOX_CONSTANTS = {
	// 박스 기본 크기
	LOW_BOX_BASE_SIZE: 6, // vh
	MID_BOX_BASE_SIZE: 6, // vh
	HIGH_BOX_BASE_SIZE: 6, // vh

	// 박스 idle 상태 크기
	LOW_IDLE_SIZE: 9, // vh
	MID_IDLE_SIZE: 6, // vh
	HIGH_IDLE_SIZE: 3, // vh

	// 박스 최대 확장 크기
	LOW_MAX_EXTRA: 12, // vh
	MID_MAX_EXTRA: 10, // vh
	HIGH_MAX_EXTRA: 8, // vh

	// 박스 초기 투명도
	LOW_INITIAL_OPACITY: 0.4,
	MID_INITIAL_OPACITY: 0.3,
	HIGH_INITIAL_OPACITY: 0.2,

	// 이미지 투명도
	IMAGE_OPACITY_DARK: 0.85,
	IMAGE_OPACITY_LIGHT: 0.95,

	// 색상 RGB 값
	COLOR_RGB_DARK: '251, 113, 133',
	COLOR_RGB_LIGHT: '200, 60, 90',

	// Z-Index
	Z_INDEX: {
		LOW: 1,
		MID: 2,
		HIGH: 3,
		IMAGE: 4,
	},
} as const;
