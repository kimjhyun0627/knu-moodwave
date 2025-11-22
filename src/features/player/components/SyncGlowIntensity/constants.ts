/**
 * SyncGlowIntensity 컴포넌트 관련 상수
 */

export const INTENSITY_BOX_CONSTANTS = {
	// 박스 기본 크기 (모든 박스 동일)
	BOX_BASE_SIZE: 0, // vh

	// 박스 idle 상태 크기 (모든 박스 동일)
	BOX_IDLE_SIZE: 0, // vh

	// 박스 최대 확장 크기 (모든 박스 동일)
	BOX_MAX_EXTRA: 20, // vh

	// 박스 초기 투명도 (모든 박스 동일)
	BOX_INITIAL_OPACITY: 0.3,

	// 이미지 투명도
	IMAGE_OPACITY_DARK: 0.85,
	IMAGE_OPACITY_LIGHT: 0.95,

	// 주파수 대역별 색상 RGB 값 (명도 차이) - 더 뚜렷한 대비
	// Low: 빨강/주황 계열 (어두운 명도) - 저음의 따뜻하고 깊은 느낌
	LOW_COLOR_RGB_DARK: '255, 80, 80', // 진한 빨강
	LOW_COLOR_RGB_LIGHT: '220, 50, 50', // 진한 빨강 (라이트 모드)

	// Mid: 노랑/주황 계열 (중간 명도) - 중음의 밝고 활기찬 느낌
	MID_COLOR_RGB_DARK: '255, 200, 50', // 밝은 노랑/주황
	MID_COLOR_RGB_LIGHT: '255, 180, 40', // 밝은 노랑/주황 (라이트 모드)

	// High: 파랑/보라 계열 (밝은 명도) - 고음의 차갑고 날카로운 느낌
	HIGH_COLOR_RGB_DARK: '100, 150, 255', // 진한 파랑
	HIGH_COLOR_RGB_LIGHT: '80, 120, 230', // 진한 파랑 (라이트 모드)

	// 레거시 호환성 (기본값)
	COLOR_RGB_DARK: '251, 113, 133',
	COLOR_RGB_LIGHT: '200, 60, 90',

	// Z-Index (바깥쪽이 뒤, 안쪽이 앞)
	// Low는 가장 바깥쪽이므로 가장 뒤, High는 가장 안쪽이므로 가장 앞
	Z_INDEX: {
		LOW: 1, // 가장 뒤 (바깥쪽)
		MID: 2, // 중간
		HIGH: 3, // 가장 앞 (안쪽)
		IMAGE: 4, // 이미지는 가장 위
	},
} as const;
