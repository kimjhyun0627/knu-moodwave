/**
 * ParameterPanel 관련 상수
 */

// 인디케이터 위치 오프셋 (패널 오른쪽 바깥 거리)
export const INDICATOR_OFFSET_FROM_PANEL = 0; // px

// 가로 모드 최대 너비 계산 비율 (초기 화면 높이의 80%)
export const HORIZONTAL_MAX_WIDTH_RATIO = 0.8;

// 기본 가로 모드 최대 너비
export const DEFAULT_HORIZONTAL_MAX_WIDTH = 960;

// 세로 모드에서 2행 레이아웃 사용 기준 파라미터 개수
export const VERTICAL_TWO_ROWS_THRESHOLD = 6;

// 화면 높이에 따른 표시 개수 기준
export const VISIBLE_COUNT_BREAKPOINTS = {
	VERY_SMALL: 840, // 1개 표시
	SMALL: 1000, // 2개 표시
	// 그 이상: 3개 표시
} as const;

// 애니메이션 지속 시간 (ms)
export const ANIMATION_DURATIONS = {
	BUTTON_REMOVE: 300,
	PANEL_EXIT: 300,
	LAYOUT: 600,
	OPACITY: 300,
	INDICATOR_DELAY: 30, // 인디케이터 순차 등장 지연 시간
} as const;

// 캐러셀 네비게이션 방향
export type NavigationDirection = 'up' | 'down' | null;

// 캐러셀 애니메이션 설정
export const CAROUSEL_ANIMATION = {
	spring: {
		type: 'spring' as const,
		stiffness: 300,
		damping: 30,
	},
	initialY: {
		up: -50, // 위에서 내려옴
		down: 50, // 아래에서 올라옴
		default: 0,
	},
	exitY: {
		up: 50, // 아래로 사라짐
		down: -50, // 위로 사라짐
		default: 0,
	},
} as const;

// 인디케이터 애니메이션 설정
export const INDICATOR_ANIMATION = {
	spring: {
		type: 'spring' as const,
		stiffness: 400,
		damping: 25,
	},
	scale: {
		initial: 0.5,
		animate: 1,
		exit: 0.5,
	},
	y: {
		initial: -10,
		animate: 0,
		exit: 10,
	},
} as const;

// 공통 파라미터 버튼 애니메이션 설정
export const COMMON_PARAM_BUTTON_ANIMATION = {
	layout: {
		duration: 0.3,
		ease: [0.4, 0, 0.2, 1] as const,
	},
	opacity: {
		duration: 0.3,
		ease: [0.4, 0, 0.2, 1] as const,
	},
	scale: {
		duration: 0.3,
		ease: [0.4, 0, 0.2, 1] as const,
	},
	removing: {
		opacity: 0,
		scale: 0.8,
		width: 0,
		paddingLeft: 0,
		paddingRight: 0,
		marginRight: 0,
	},
} as const;

// 공통 파라미터 패널 애니메이션 설정
export const COMMON_PARAM_PANEL_ANIMATION = {
	initial: {
		opacity: 0,
		y: -20,
		scale: 0.95,
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
	},
	exit: {
		opacity: 0,
		y: 20,
		scale: 0.95,
	},
	transition: {
		layout: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1] as const,
		},
		opacity: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1] as const,
		},
		y: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1] as const,
		},
		scale: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1] as const,
		},
	},
} as const;
