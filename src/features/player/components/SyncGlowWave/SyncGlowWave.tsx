import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { MusicGenre } from '@/shared/types';
import { useThemeColors } from '@/shared/hooks';
import { useAudioAnalyzer } from '../../hooks';
import { usePlayerStore } from '@/store/playerStore';
import { WaveformCanvas } from './WaveformCanvas';
import { AudioMetricsHUD } from './AudioMetricsHUD';
import { GenreImage } from './GenreImage';
import { BPMEstimator } from './metricsUtils';
import { WAVEFORM_CONSTANTS } from './constants';

interface SyncGlowWaveProps {
	genre: MusicGenre;
	isPlaying: boolean;
}

export const SyncGlowWave = ({ genre, isPlaying }: SyncGlowWaveProps) => {
	const colors = useThemeColors();
	const currentTrack = usePlayerStore((state) => state.getCurrentTrack());

	// 이미지 투명도 설정
	const imageOpacity = colors.isDark ? WAVEFORM_CONSTANTS.IMAGE_OPACITY_DARK : WAVEFORM_CONSTANTS.IMAGE_OPACITY_LIGHT;

	// 오디오 분석 (재생 중일 때만 활성화)
	const audioAnalysis = useAudioAnalyzer(isPlaying);

	// BPM 추정기
	const bpmEstimatorRef = useRef<BPMEstimator>(new BPMEstimator());
	const [bpm, setBpm] = useState<number | null>(null);
	// 트랙 변경 시 BPM 추정기 리셋
	useEffect(() => {
		if (currentTrack?.id) {
			bpmEstimatorRef.current.reset();
			setBpm(null);
		}
	}, [currentTrack?.id]);

	// BPM 계산
	useEffect(() => {
		if (!isPlaying) {
			return;
		}

		// BPM 추정
		const estimatedBPM = bpmEstimatorRef.current.estimateBPM(audioAnalysis.peak, audioAnalysis.timestamp);
		if (estimatedBPM !== null) {
			setBpm(estimatedBPM);
		}
	}, [audioAnalysis.peak, audioAnalysis.timestamp, isPlaying]);

	return (
		<div className="fixed inset-0 z-0 flex items-center justify-center md:pt-[28px] md:pb-[28px] py-[40px] md:px-[28px] md:py-[40px]">
			<motion.div
				className="w-[calc(100vw-20vh)] h-[80vh] overflow-hidden relative"
				style={{
					background: 'transparent',
					border: 'none',
				}}
			>
				{/* 장르 이미지 (배경) */}
				<GenreImage
					genre={genre}
					isPlaying={isPlaying}
					imageOpacity={imageOpacity}
					zIndex={0}
				/>

				{/* 주파수 스펙트럼 막대 그래프 (중앙 정렬) */}
				<WaveformCanvas
					isPlaying={isPlaying}
					isDark={colors.isDark}
				/>

				{/* 오디오 지표 HUD */}
				<AudioMetricsHUD
					rms={audioAnalysis.rms}
					bpm={bpm}
					lowEnergy={audioAnalysis.lowBandEnergy}
					midEnergy={audioAnalysis.midBandEnergy}
					highEnergy={audioAnalysis.highBandEnergy}
				/>
			</motion.div>
		</div>
	);
};
