/**
 * 박스 스타일 계산 유틸리티 함수
 */
import { BOX_CONSTANTS } from './constants';

export interface BoxStyleConfig {
	baseSize: number; // 기본 크기 (vh)
	colorRgb: string; // RGB 색상 값
}

export interface IntensityBoxConfig extends BoxStyleConfig {
	intensity: number;
	extraPixels: number;
	isPlaying: boolean;
}

export interface BeatBoxConfig extends BoxStyleConfig {
	beatLevel: number;
	extraPixels: number;
}

// 스타일 계산 상수
const STYLE_CONSTANTS = {
	// Intensity 박스 스타일
	INTENSITY: {
		BACKGROUND_OPACITY: {
			START: 0.4,
			MID: 0.2,
			END: 0.4,
		},
		BORDER_OPACITY: 0.5,
		BOX_SHADOW: {
			BLUR_BASE: 10,
			BLUR_MULTIPLIER: 20,
			OPACITY_BASE: 0.3,
			OPACITY_MULTIPLIER: 0.3,
			SPREAD_BASE: 20,
			SPREAD_MULTIPLIER: 40,
			SPREAD_OPACITY_BASE: 0.2,
			SPREAD_OPACITY_MULTIPLIER: 0.2,
			INSET_BLUR_BASE: 10,
			INSET_BLUR_MULTIPLIER: 10,
			INSET_OPACITY_BASE: 0.1,
			INSET_OPACITY_MULTIPLIER: 0.2,
		},
		BACKDROP_FILTER_BLUR: 10,
		FILTER_BLUR_BASE: 2,
		FILTER_BLUR_MULTIPLIER: 3,
		OPACITY_BASE: 0.3,
		OPACITY_INTENSITY_REDUCTION: 0.2,
		OPACITY_MIN: 0.1,
	},
	// Beat 박스 스타일
	BEAT: {
		BACKGROUND_OPACITY: {
			START: 0.9,
			MID: 0.6,
			END: 0.3,
		},
		BORDER_OPACITY: 0.8,
		BOX_SHADOW: {
			BLUR_BASE: 30,
			BLUR_MULTIPLIER: 20,
			OPACITY_BASE: 0.5,
			OPACITY_MULTIPLIER: 0.3,
			SPREAD_BASE: 60,
			SPREAD_MULTIPLIER: 40,
			SPREAD_OPACITY_BASE: 0.3,
			SPREAD_OPACITY_MULTIPLIER: 0.2,
			FAR_SPREAD_BASE: 90,
			FAR_SPREAD_MULTIPLIER: 60,
			FAR_SPREAD_OPACITY_BASE: 0.1,
			FAR_SPREAD_OPACITY_MULTIPLIER: 0.2,
			INSET_BLUR_BASE: 30,
			INSET_BLUR_MULTIPLIER: 20,
			INSET_OPACITY_BASE: 0.2,
			INSET_OPACITY_MULTIPLIER: 0.2,
		},
		BACKDROP_FILTER_BLUR: 15,
		FILTER_BLUR_BASE: 2,
		FILTER_BLUR_MULTIPLIER: 2,
		FILTER_BRIGHTNESS_MULTIPLIER: 0.4,
		OPACITY_BASE: 0.5,
		OPACITY_MULTIPLIER: 0.4,
	},
	// Transition 상수
	TRANSITION: {
		FAST_DURATION: 0.03,
		SLOW_DURATION: 0.15,
		OPACITY_DURATION: 0.1,
	},
} as const;

/**
 * Intensity 박스 스타일 계산
 */
export const getIntensityBoxStyle = (config: IntensityBoxConfig) => {
	const { colorRgb, intensity, extraPixels, isPlaying } = config;
	const { INTENSITY } = STYLE_CONSTANTS;

	// 애니메이션 활성화 시(재생 중) intensity가 높을수록 opacity를 낮춤
	const baseOpacity = isPlaying ? INTENSITY.OPACITY_BASE - intensity * INTENSITY.OPACITY_INTENSITY_REDUCTION : INTENSITY.OPACITY_BASE;
	const opacity = Math.max(INTENSITY.OPACITY_MIN, baseOpacity);

	const blurValue = INTENSITY.BOX_SHADOW.BLUR_BASE + intensity * INTENSITY.BOX_SHADOW.BLUR_MULTIPLIER;
	const blurOpacity = INTENSITY.BOX_SHADOW.OPACITY_BASE + intensity * INTENSITY.BOX_SHADOW.OPACITY_MULTIPLIER;

	const spreadValue = INTENSITY.BOX_SHADOW.SPREAD_BASE + intensity * INTENSITY.BOX_SHADOW.SPREAD_MULTIPLIER;
	const spreadOpacity = INTENSITY.BOX_SHADOW.SPREAD_OPACITY_BASE + intensity * INTENSITY.BOX_SHADOW.SPREAD_OPACITY_MULTIPLIER;

	const insetBlurValue = INTENSITY.BOX_SHADOW.INSET_BLUR_BASE + intensity * INTENSITY.BOX_SHADOW.INSET_BLUR_MULTIPLIER;
	const insetOpacity = INTENSITY.BOX_SHADOW.INSET_OPACITY_BASE + intensity * INTENSITY.BOX_SHADOW.INSET_OPACITY_MULTIPLIER;

	const filterBlur = INTENSITY.FILTER_BLUR_BASE + intensity * INTENSITY.FILTER_BLUR_MULTIPLIER;

	return {
		background: `linear-gradient(135deg, rgba(${colorRgb}, ${INTENSITY.BACKGROUND_OPACITY.START}) 0%, rgba(${colorRgb}, ${INTENSITY.BACKGROUND_OPACITY.MID}) 50%, rgba(${colorRgb}, ${INTENSITY.BACKGROUND_OPACITY.END}) 100%)`,
		border: `1px solid rgba(${colorRgb}, ${INTENSITY.BORDER_OPACITY})`,
		boxShadow: `
			0 0 ${blurValue}px rgba(${colorRgb}, ${blurOpacity}),
			0 0 ${spreadValue}px rgba(${colorRgb}, ${spreadOpacity}),
			inset 0 0 ${insetBlurValue}px rgba(${colorRgb}, ${insetOpacity})
		`,
		backdropFilter: `blur(${INTENSITY.BACKDROP_FILTER_BLUR}px)`,
		filter: `blur(${filterBlur}px)`,
		opacity,
		extraPixels,
	};
};

/**
 * Beat 박스 스타일 계산
 */
export const getBeatBoxStyle = (config: BeatBoxConfig) => {
	const { colorRgb, beatLevel, extraPixels } = config;
	const { BEAT } = STYLE_CONSTANTS;

	const blurValue = BEAT.BOX_SHADOW.BLUR_BASE + beatLevel * BEAT.BOX_SHADOW.BLUR_MULTIPLIER;
	const blurOpacity = BEAT.BOX_SHADOW.OPACITY_BASE + beatLevel * BEAT.BOX_SHADOW.OPACITY_MULTIPLIER;

	const spreadValue = BEAT.BOX_SHADOW.SPREAD_BASE + beatLevel * BEAT.BOX_SHADOW.SPREAD_MULTIPLIER;
	const spreadOpacity = BEAT.BOX_SHADOW.SPREAD_OPACITY_BASE + beatLevel * BEAT.BOX_SHADOW.SPREAD_OPACITY_MULTIPLIER;

	const farSpreadValue = BEAT.BOX_SHADOW.FAR_SPREAD_BASE + beatLevel * BEAT.BOX_SHADOW.FAR_SPREAD_MULTIPLIER;
	const farSpreadOpacity = BEAT.BOX_SHADOW.FAR_SPREAD_OPACITY_BASE + beatLevel * BEAT.BOX_SHADOW.FAR_SPREAD_OPACITY_MULTIPLIER;

	const insetBlurValue = BEAT.BOX_SHADOW.INSET_BLUR_BASE + beatLevel * BEAT.BOX_SHADOW.INSET_BLUR_MULTIPLIER;
	const insetOpacity = BEAT.BOX_SHADOW.INSET_OPACITY_BASE + beatLevel * BEAT.BOX_SHADOW.INSET_OPACITY_MULTIPLIER;

	const filterBlur = BEAT.FILTER_BLUR_BASE + beatLevel * BEAT.FILTER_BLUR_MULTIPLIER;
	const filterBrightness = 1 + beatLevel * BEAT.FILTER_BRIGHTNESS_MULTIPLIER;
	const opacity = BEAT.OPACITY_BASE + beatLevel * BEAT.OPACITY_MULTIPLIER;

	return {
		background: `radial-gradient(circle, rgba(${colorRgb}, ${BEAT.BACKGROUND_OPACITY.START}) 0%, rgba(${colorRgb}, ${BEAT.BACKGROUND_OPACITY.MID}) 50%, rgba(${colorRgb}, ${BEAT.BACKGROUND_OPACITY.END}) 100%)`,
		border: `2px solid rgba(${colorRgb}, ${BEAT.BORDER_OPACITY})`,
		boxShadow: `
			0 0 ${blurValue}px rgba(${colorRgb}, ${blurOpacity}),
			0 0 ${spreadValue}px rgba(${colorRgb}, ${spreadOpacity}),
			0 0 ${farSpreadValue}px rgba(${colorRgb}, ${farSpreadOpacity}),
			inset 0 0 ${insetBlurValue}px rgba(${colorRgb}, ${insetOpacity})
		`,
		backdropFilter: `blur(${BEAT.BACKDROP_FILTER_BLUR}px)`,
		filter: `blur(${filterBlur}px) brightness(${filterBrightness})`,
		opacity,
		extraPixels,
	};
};

/**
 * Transition 계산 유틸리티
 */
export const getTransition = (isGrowing: boolean, type: 'intensity' | 'beat') => {
	const { TRANSITION } = STYLE_CONSTANTS;
	const duration = isGrowing ? TRANSITION.FAST_DURATION : TRANSITION.SLOW_DURATION;

	return {
		width: { duration, ease: 'easeOut' as const },
		height: { duration, ease: 'easeOut' as const },
		left: { duration, ease: 'easeOut' as const },
		top: { duration, ease: 'easeOut' as const },
		opacity: { duration: TRANSITION.OPACITY_DURATION },
		boxShadow: { duration, ease: 'easeOut' as const },
		filter: { duration, ease: 'easeOut' as const },
	};
};
