/**
 * Intensity 박스 스타일 계산 유틸리티 함수
 */

export interface IntensityBoxStyleConfig {
	colorRgb: string;
	intensity: number;
	extraPixels: number;
	type: 'low' | 'mid' | 'high';
}

// 스타일 계산 상수
const STYLE_CONSTANTS = {
	LOW: {
		BACKGROUND_OPACITY: {
			START_BASE: 0.9,
			START_MULTIPLIER: 0.1,
			MID_BASE: 0.6,
			MID_MULTIPLIER: 0.2,
			END_BASE: 0.3,
			END_MULTIPLIER: 0.3,
		},
		BORDER_OPACITY_BASE: 0.8,
		BORDER_OPACITY_MULTIPLIER: 0.2,
		BACKDROP_FILTER_BLUR: 15,
		FILTER_BLUR_BASE: 2,
		FILTER_BLUR_MULTIPLIER: 3,
		FILTER_BRIGHTNESS_MULTIPLIER: 0.3,
		OPACITY_BASE: 0.5,
		OPACITY_MULTIPLIER: 0.4,
		BOX_SHADOW: {
			BLUR_BASE: 30,
			BLUR_MULTIPLIER: 30,
			BLUR_OPACITY_BASE: 0.5,
			BLUR_OPACITY_MULTIPLIER: 0.4,
			SPREAD_BASE: 60,
			SPREAD_MULTIPLIER: 60,
			SPREAD_OPACITY_BASE: 0.3,
			SPREAD_OPACITY_MULTIPLIER: 0.3,
			FAR_SPREAD_BASE: 90,
			FAR_SPREAD_MULTIPLIER: 90,
			FAR_SPREAD_OPACITY_BASE: 0.1,
			FAR_SPREAD_OPACITY_MULTIPLIER: 0.2,
			INSET_BLUR_BASE: 30,
			INSET_BLUR_MULTIPLIER: 30,
			INSET_OPACITY_BASE: 0.2,
			INSET_OPACITY_MULTIPLIER: 0.3,
		},
	},
	MID: {
		BACKGROUND_OPACITY: {
			START_BASE: 0.4,
			START_MULTIPLIER: 0.4,
			MID_BASE: 0.2,
			MID_MULTIPLIER: 0.3,
			END_BASE: 0.4,
			END_MULTIPLIER: 0.4,
		},
		BORDER_OPACITY_BASE: 0.5,
		BORDER_OPACITY_MULTIPLIER: 0.3,
		BACKDROP_FILTER_BLUR: 10,
		FILTER_BLUR_BASE: 2,
		FILTER_BLUR_MULTIPLIER: 3,
		OPACITY_BASE: 0.4,
		OPACITY_MULTIPLIER: 0.4,
		BOX_SHADOW: {
			BLUR_BASE: 10,
			BLUR_MULTIPLIER: 20,
			BLUR_OPACITY_BASE: 0.3,
			BLUR_OPACITY_MULTIPLIER: 0.3,
			SPREAD_BASE: 20,
			SPREAD_MULTIPLIER: 40,
			SPREAD_OPACITY_BASE: 0.2,
			SPREAD_OPACITY_MULTIPLIER: 0.2,
			INSET_BLUR_BASE: 10,
			INSET_BLUR_MULTIPLIER: 10,
			INSET_OPACITY_BASE: 0.1,
			INSET_OPACITY_MULTIPLIER: 0.2,
		},
	},
	HIGH: {
		BACKGROUND_OPACITY: {
			START_BASE: 0.3,
			START_MULTIPLIER: 0.4,
			MID_BASE: 0.2,
			MID_MULTIPLIER: 0.3,
			END_BASE: 0.1,
			END_MULTIPLIER: 0.2,
		},
		BORDER_OPACITY_BASE: 0.4,
		BORDER_OPACITY_MULTIPLIER: 0.4,
		BACKDROP_FILTER_BLUR: 10,
		FILTER_BLUR_BASE: 2,
		FILTER_BLUR_MULTIPLIER: 2,
		OPACITY_BASE: 0.3,
		OPACITY_MULTIPLIER: 0.3,
		BOX_SHADOW: {
			BLUR_BASE: 10,
			BLUR_MULTIPLIER: 20,
			BLUR_OPACITY_BASE: 0.2,
			BLUR_OPACITY_MULTIPLIER: 0.3,
			SPREAD_BASE: 20,
			SPREAD_MULTIPLIER: 40,
			SPREAD_OPACITY_BASE: 0.15,
			SPREAD_OPACITY_MULTIPLIER: 0.2,
			INSET_BLUR_BASE: 10,
			INSET_BLUR_MULTIPLIER: 10,
			INSET_OPACITY_BASE: 0.1,
			INSET_OPACITY_MULTIPLIER: 0.2,
		},
	},
	TRANSITION: {
		DURATION: 0.05,
		OPACITY_DURATION: 0.1,
	},
} as const;

/**
 * Intensity 박스 스타일 계산
 */
export const getIntensityBoxStyle = (config: IntensityBoxStyleConfig) => {
	const { colorRgb, intensity, extraPixels, type } = config;
	const styleConfig = STYLE_CONSTANTS[type.toUpperCase() as 'LOW' | 'MID' | 'HIGH'];

	const backgroundStartOpacity = styleConfig.BACKGROUND_OPACITY.START_BASE + intensity * styleConfig.BACKGROUND_OPACITY.START_MULTIPLIER;
	const backgroundMidOpacity = styleConfig.BACKGROUND_OPACITY.MID_BASE + intensity * styleConfig.BACKGROUND_OPACITY.MID_MULTIPLIER;
	const backgroundEndOpacity = styleConfig.BACKGROUND_OPACITY.END_BASE + intensity * styleConfig.BACKGROUND_OPACITY.END_MULTIPLIER;

	const borderOpacity = styleConfig.BORDER_OPACITY_BASE + intensity * styleConfig.BORDER_OPACITY_MULTIPLIER;
	const filterBlur = styleConfig.FILTER_BLUR_BASE + intensity * styleConfig.FILTER_BLUR_MULTIPLIER;
	const opacity = styleConfig.OPACITY_BASE + intensity * styleConfig.OPACITY_MULTIPLIER;

	// Low 박스는 radial-gradient, brightness 추가
	const background =
		type === 'low'
			? `radial-gradient(circle, rgba(${colorRgb}, ${backgroundStartOpacity}) 0%, rgba(${colorRgb}, ${backgroundMidOpacity}) 50%, rgba(${colorRgb}, ${backgroundEndOpacity}) 100%)`
			: type === 'mid'
				? `linear-gradient(135deg, rgba(${colorRgb}, ${backgroundStartOpacity}) 0%, rgba(${colorRgb}, ${backgroundMidOpacity}) 50%, rgba(${colorRgb}, ${backgroundEndOpacity}) 100%)`
				: `radial-gradient(circle, rgba(${colorRgb}, ${backgroundStartOpacity}) 0%, rgba(${colorRgb}, ${backgroundMidOpacity}) 50%, rgba(${colorRgb}, ${backgroundEndOpacity}) 100%)`;

	const filter =
		type === 'low' && 'FILTER_BRIGHTNESS_MULTIPLIER' in styleConfig ? `blur(${filterBlur}px) brightness(${1 + intensity * styleConfig.FILTER_BRIGHTNESS_MULTIPLIER})` : `blur(${filterBlur}px)`;

	const borderWidth = type === 'low' ? 2 : 1;

	// Box shadow 계산
	const blurValue = styleConfig.BOX_SHADOW.BLUR_BASE + intensity * styleConfig.BOX_SHADOW.BLUR_MULTIPLIER;
	const blurOpacity = styleConfig.BOX_SHADOW.BLUR_OPACITY_BASE + intensity * styleConfig.BOX_SHADOW.BLUR_OPACITY_MULTIPLIER;
	const spreadValue = styleConfig.BOX_SHADOW.SPREAD_BASE + intensity * styleConfig.BOX_SHADOW.SPREAD_MULTIPLIER;
	const spreadOpacity = styleConfig.BOX_SHADOW.SPREAD_OPACITY_BASE + intensity * styleConfig.BOX_SHADOW.SPREAD_OPACITY_MULTIPLIER;
	const insetBlurValue = styleConfig.BOX_SHADOW.INSET_BLUR_BASE + intensity * styleConfig.BOX_SHADOW.INSET_BLUR_MULTIPLIER;
	const insetOpacity = styleConfig.BOX_SHADOW.INSET_OPACITY_BASE + intensity * styleConfig.BOX_SHADOW.INSET_OPACITY_MULTIPLIER;

	let boxShadow = `
		0 0 ${blurValue}px rgba(${colorRgb}, ${blurOpacity}),
		0 0 ${spreadValue}px rgba(${colorRgb}, ${spreadOpacity}),
		inset 0 0 ${insetBlurValue}px rgba(${colorRgb}, ${insetOpacity})
	`;

	// Low 박스는 추가 far spread shadow
	if (type === 'low' && 'FAR_SPREAD_BASE' in styleConfig.BOX_SHADOW) {
		const farSpreadValue = styleConfig.BOX_SHADOW.FAR_SPREAD_BASE + intensity * styleConfig.BOX_SHADOW.FAR_SPREAD_MULTIPLIER;
		const farSpreadOpacity = styleConfig.BOX_SHADOW.FAR_SPREAD_OPACITY_BASE + intensity * styleConfig.BOX_SHADOW.FAR_SPREAD_OPACITY_MULTIPLIER;
		boxShadow = `
			0 0 ${blurValue}px rgba(${colorRgb}, ${blurOpacity}),
			0 0 ${spreadValue}px rgba(${colorRgb}, ${spreadOpacity}),
			0 0 ${farSpreadValue}px rgba(${colorRgb}, ${farSpreadOpacity}),
			inset 0 0 ${insetBlurValue}px rgba(${colorRgb}, ${insetOpacity})
		`;
	}

	return {
		background,
		border: `${borderWidth}px solid rgba(${colorRgb}, ${borderOpacity})`,
		boxShadow: boxShadow.trim(),
		backdropFilter: `blur(${styleConfig.BACKDROP_FILTER_BLUR}px)`,
		filter,
		opacity,
		extraPixels,
	};
};

/**
 * Transition 계산 유틸리티
 */
export const getTransition = () => {
	const { TRANSITION } = STYLE_CONSTANTS;

	return {
		width: { duration: TRANSITION.DURATION, ease: 'easeOut' as const },
		height: { duration: TRANSITION.DURATION, ease: 'easeOut' as const },
		left: { duration: TRANSITION.DURATION, ease: 'easeOut' as const },
		top: { duration: TRANSITION.DURATION, ease: 'easeOut' as const },
		opacity: { duration: TRANSITION.OPACITY_DURATION },
		boxShadow: { duration: TRANSITION.DURATION, ease: 'easeOut' as const },
		filter: { duration: TRANSITION.DURATION, ease: 'easeOut' as const },
	};
};
