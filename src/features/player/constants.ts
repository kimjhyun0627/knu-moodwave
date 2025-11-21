/**
 * Player 페이지 애니메이션 설정
 */
export const PLAYER_ANIMATIONS = {
	topBar: {
		initial: { opacity: 0, y: -20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.5 },
	},
	topBarDelayed: {
		initial: { opacity: 0, y: -20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.5, delay: 0.1 },
	},
	genreInfo: {
		initial: { opacity: 0, x: -20 },
		animate: { opacity: 1, x: 0 },
		transition: { duration: 0.6, delay: 0.2 },
	},
	centerImage: {
		initial: { opacity: 0, scale: 0.9 },
		animate: { opacity: 1, scale: 1 },
		transition: { duration: 0.7, delay: 0.3, type: 'spring' as const, stiffness: 100 },
	},
	playerBoard: {
		initial: { y: 100, opacity: 0, scale: 0.95 },
		animate: { y: 0, opacity: 1, scale: 1 },
		transition: {
			duration: 0.8,
			delay: 0.4,
			type: 'spring' as const,
			stiffness: 80,
			damping: 20,
			opacity: {
				duration: 1.2,
				delay: 0.4,
				ease: [0.16, 1, 0.3, 1],
			},
			scale: {
				duration: 0.7,
				delay: 0.4,
				ease: [0.4, 0, 0.2, 1],
			},
			y: {
				type: 'spring' as const,
				stiffness: 80,
				damping: 20,
				delay: 0.4,
			},
		},
	},
	parameterPanel: {
		initial: { y: 20, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: 20, opacity: 0 },
		transition: {
			y: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
			opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
		},
	},
	parameterItem: {
		initial: { opacity: 0, y: 20, scale: 0.95 },
		animate: { opacity: 1, y: 0, scale: 1 },
		exit: {
			opacity: 0,
			y: -10,
			scale: 0.95,
			height: 0,
			marginBottom: 0,
			paddingTop: 0,
			paddingBottom: 0,
		},
		transition: {
			layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
			opacity: { duration: 0.5, ease: 'easeOut' },
			height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
			y: { duration: 0.5, ease: 'easeOut' },
			scale: { duration: 0.5, ease: 'easeOut' },
		},
	},
	parameterGrid: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
			opacity: { duration: 0.3, delay: 0.1 },
		},
	},
	playButtonShine: {
		animate: {
			x: ['-100%', '200%'],
		},
		transition: {
			duration: 2,
			repeat: Infinity,
			ease: 'linear',
		},
	},
	playButtonIcon: {
		initial: { opacity: 0, rotate: -90 },
		animate: { opacity: 1, rotate: 0 },
		exit: { opacity: 0, rotate: 90 },
		transition: { duration: 0.2 },
	},
	imageScale: {
		initial: { scale: 1.1 },
		animate: { scale: 1 },
		transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
	},
	emojiAnimation: {
		animate: {
			scale: [1, 1.1, 1],
			rotate: [0, 5, -5, 0],
		},
		transition: {
			duration: 2,
			repeat: Infinity,
			ease: 'easeInOut',
		},
	},
	gradientOverlay: {
		animate: {
			background: [
				'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3), transparent 50%)',
				'radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3), transparent 50%)',
				'radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.3), transparent 50%)',
				'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3), transparent 50%)',
			],
		},
		transition: {
			duration: 4,
			repeat: Infinity,
			ease: 'easeInOut',
		},
	},
	progressBar: {
		initial: { width: 0 },
		animate: { width: '100%' },
		transition: { duration: 0.1 },
	},
	expandButton: {
		animate: { rotate: 0 },
		transition: { duration: 0.3 },
	},
	commonParamButton: {
		initial: { opacity: 0, scale: 0.9 },
		animate: { opacity: 1, scale: 1 },
		whileHover: { scale: 1.05 },
		whileTap: { scale: 0.95 },
		transition: { duration: 0.2 },
	},
	commonParamPanel: {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 10 },
		transition: {
			layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
			opacity: { duration: 0.3 },
			y: { duration: 0.3 },
		},
	},
	playerControls: {
		hidden: {
			y: 200,
			opacity: 0,
			scale: 0.95,
			transition: {
				y: {
					type: 'spring' as const,
					stiffness: 100,
					damping: 25,
				},
				opacity: {
					duration: 0.3,
					ease: [0.4, 0, 0.2, 1],
				},
				scale: {
					duration: 0.4,
					ease: [0.4, 0, 0.2, 1],
				},
			},
		},
		visible: {
			y: 0,
			opacity: 1,
			scale: 1,
			transition: {
				delay: 0.4,
				y: {
					type: 'spring' as const,
					stiffness: 80,
					damping: 20,
				},
				opacity: {
					type: 'spring' as const,
					stiffness: 100,
					damping: 25,
				},
				scale: {
					duration: 0.7,
					ease: [0.4, 0, 0.2, 1],
				},
			},
		},
	},
} as const;

/**
 * Player 페이지 스타일 상수
 */
export const PLAYER_STYLES = {
	glassButton: {
		base: 'p-3 rounded-2xl btn-glass hover:glow-secondary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 backdrop-blur-md bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-white/20 shadow-lg hover:bg-white/30 dark:hover:bg-slate-800/40',
		homeButton:
			'btn-glass rounded-2xl backdrop-blur-md bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-white/20 shadow-lg hover:bg-white/30 dark:hover:bg-slate-800/40 hover:shadow-xl transition-all duration-300 h-11 px-4 py-0 flex items-center',
		controlButton: 'p-3 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-110 active:scale-95',
		playButton: 'p-4 md:p-5 rounded-full transition-all duration-200 glow-primary shadow-2xl relative overflow-hidden group hover:scale-110 active:scale-95',
	},
	glassCard: 'glass-card rounded-2xl p-4 md:p-5 backdrop-blur-md bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-white/20 shadow-lg',
	playerBoard: 'rounded-2xl backdrop-blur-xl border shadow-2xl px-6 md:px-8 py-4 md:py-6 w-full max-w-[960px]',
	parameterPanel: 'rounded-2xl backdrop-blur-xl border shadow-2xl w-full overflow-hidden py-6 md:py-8',
} as const;
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
// Default Audio Parameters
export const DEFAULT_AUDIO_PARAMS = {
	// 공통 파라미터
	reverb: 30,
	delay: 20,
	compressor: 50,
	filter: 50,
	distortion: 0,
	'stereo-width': 50,
	gain: 50,
	// 카테고리별 파라미터
	tempo: 80, // focus: 80, relax: 65 -> 평균값 사용
	bass: 50, // focus: 40, energy: 75, mood: 55, workout: 85 -> 평균값 사용
	clarity: 70, // focus
	energy: 80, // energy: 80, workout: 90 -> 평균값 사용
	kick: 85, // energy
	space: 75, // relax
	balance: 50, // relax
	mood: 60, // mood
	texture: 50, // mood
	beat: 90, // workout
};

// Parameter Ranges
export const PARAM_RANGES = {
	// 공통 파라미터
	reverb: { min: 0, max: 100, step: 1 },
	delay: { min: 0, max: 100, step: 1 },
	compressor: { min: 0, max: 100, step: 1 },
	filter: { min: 0, max: 100, step: 1 },
	distortion: { min: 0, max: 100, step: 1 },
	'stereo-width': { min: 0, max: 100, step: 1 },
	gain: { min: 0, max: 100, step: 1 },
	// 카테고리별 파라미터
	tempo: { min: 50, max: 120, step: 1 }, // focus: 60-120, relax: 50-90 -> 전체 범위 통합
	bass: { min: 0, max: 100, step: 1 },
	clarity: { min: 0, max: 100, step: 1 },
	energy: { min: 0, max: 100, step: 1 },
	kick: { min: 0, max: 100, step: 1 },
	space: { min: 0, max: 100, step: 1 },
	balance: { min: 0, max: 100, step: 1 },
	mood: { min: 0, max: 100, step: 1 },
	texture: { min: 0, max: 100, step: 1 },
	beat: { min: 0, max: 100, step: 1 },
};
