import { useRef } from 'react';
import { BOX_CONSTANTS } from './constants';

interface UseBoxSizesProps {
	intensity: number;
	beatLevel: number;
	isPlaying: boolean;
}

/**
 * 박스 크기 계산 커스텀 훅
 */
export const useBoxSizes = ({ intensity, beatLevel, isPlaying }: UseBoxSizesProps) => {
	const prevIntensityExtraPixelsRef = useRef<number>(BOX_CONSTANTS.INTENSITY_IDLE_SIZE);
	const prevBeatExtraPixelsRef = useRef<number>(BOX_CONSTANTS.BEAT_IDLE_SIZE);

	// Intensity 계산
	const intensityExtraPixels = isPlaying ? BOX_CONSTANTS.INTENSITY_IDLE_SIZE + intensity * BOX_CONSTANTS.INTENSITY_MAX_EXTRA : BOX_CONSTANTS.INTENSITY_IDLE_SIZE;
	const intensityIsGrowing = intensityExtraPixels > prevIntensityExtraPixelsRef.current;
	prevIntensityExtraPixelsRef.current = intensityExtraPixels;

	// Beat 계산
	const normalizedBeatLevel = Math.min(Math.max(beatLevel ?? 0, 0), 1);
	const beatExtraPixels = isPlaying ? BOX_CONSTANTS.BEAT_IDLE_SIZE + normalizedBeatLevel * BOX_CONSTANTS.BEAT_MAX_EXTRA : BOX_CONSTANTS.BEAT_IDLE_SIZE;
	const beatIsGrowing = beatExtraPixels > prevBeatExtraPixelsRef.current;
	prevBeatExtraPixelsRef.current = beatExtraPixels;

	return {
		intensityExtraPixels,
		intensityIsGrowing,
		beatExtraPixels,
		beatIsGrowing,
		normalizedBeatLevel,
	};
};
