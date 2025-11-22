import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { MusicGenre } from '@/shared/types';
import { useThemeColors } from '@/shared/hooks';
import { useAudioAnalyzer } from '../../hooks';
import { usePlayerStore } from '@/store/playerStore';
import { AnimatedBox } from './AnimatedBox';
import { getIntensityBoxStyle, getBeatBoxStyle, getTransition } from './boxUtils';
import { useBoxSizes } from './useBoxSizes';
import { GenreImage } from './GenreImage';
import { BOX_CONSTANTS } from './constants';

interface SyncGlowBeatProps {
	genre: MusicGenre;
	isPlaying: boolean;
}

export const SyncGlowBeat = ({ genre, isPlaying }: SyncGlowBeatProps) => {
	const colors = useThemeColors();
	const currentTrack = usePlayerStore((state) => state.getCurrentTrack());

	// 오디오 분석 (재생 중일 때만 활성화)
	const audioAnalysis = useAudioAnalyzer(isPlaying);

	// 테마별 설정
	const imageOpacity = colors.isDark ? BOX_CONSTANTS.IMAGE_OPACITY_DARK : BOX_CONSTANTS.IMAGE_OPACITY_LIGHT;
	const boxColorRgb = colors.isDark ? BOX_CONSTANTS.COLOR_RGB_DARK : BOX_CONSTANTS.COLOR_RGB_LIGHT;

	// 박스 크기 계산
	const { intensityExtraPixels, intensityIsGrowing, beatExtraPixels, beatIsGrowing, normalizedBeatLevel } = useBoxSizes({
		intensity: audioAnalysis.intensity,
		beatLevel: audioAnalysis.beatLevel ?? 0,
		isPlaying,
	});

	// Transition 계산
	const intensityTransition = useMemo(() => getTransition(intensityIsGrowing, 'intensity'), [intensityIsGrowing]);
	const beatTransition = useMemo(() => getTransition(beatIsGrowing, 'beat'), [beatIsGrowing]);

	// 박스 스타일 계산
	const intensityBoxStyle = useMemo(
		() =>
			getIntensityBoxStyle({
				baseSize: BOX_CONSTANTS.INTENSITY_BOX_BASE_SIZE,
				colorRgb: boxColorRgb,
				intensity: audioAnalysis.intensity,
				extraPixels: intensityExtraPixels,
				isPlaying,
			}),
		[boxColorRgb, audioAnalysis.intensity, intensityExtraPixels, isPlaying]
	);

	const beatBoxStyle = useMemo(
		() =>
			getBeatBoxStyle({
				baseSize: BOX_CONSTANTS.BEAT_BOX_BASE_SIZE,
				colorRgb: boxColorRgb,
				beatLevel: normalizedBeatLevel,
				extraPixels: beatExtraPixels,
			}),
		[boxColorRgb, normalizedBeatLevel, beatExtraPixels]
	);

	return (
		<div className="fixed inset-0 z-0 flex items-center justify-center md:pt-[28px] md:pb-[28px] py-[40px] md:px-[28px] md:py-[40px]">
			<motion.div className="w-[calc(100vw-20vh)] h-[80vh] glass-card rounded-4xl md:rounded-2rem overflow-visible shadow-2xl relative">
				{/* Intensity 박스 */}
				<AnimatedBox
					keyValue="intensity"
					trackId={currentTrack?.id || null}
					baseSize={BOX_CONSTANTS.INTENSITY_BOX_BASE_SIZE}
					extraPixels={intensityExtraPixels}
					opacity={intensityBoxStyle.opacity}
					background={intensityBoxStyle.background}
					border={intensityBoxStyle.border}
					boxShadow={intensityBoxStyle.boxShadow}
					backdropFilter={intensityBoxStyle.backdropFilter}
					filter={intensityBoxStyle.filter}
					initialOpacity={BOX_CONSTANTS.INTENSITY_INITIAL_OPACITY}
					transition={intensityTransition}
				/>

				{/* Beat 박스 */}
				<AnimatedBox
					keyValue="beat"
					trackId={currentTrack?.id || null}
					baseSize={BOX_CONSTANTS.BEAT_BOX_BASE_SIZE}
					extraPixels={beatExtraPixels}
					opacity={beatBoxStyle.opacity}
					background={beatBoxStyle.background}
					border={beatBoxStyle.border}
					boxShadow={beatBoxStyle.boxShadow}
					backdropFilter={beatBoxStyle.backdropFilter}
					filter={beatBoxStyle.filter}
					initialOpacity={BOX_CONSTANTS.BEAT_INITIAL_OPACITY}
					transition={beatTransition}
				/>

				{/* 이미지 컨테이너 */}
				<GenreImage
					genre={genre}
					isPlaying={isPlaying}
					imageOpacity={imageOpacity}
				/>
			</motion.div>
		</div>
	);
};
