import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { MusicGenre } from '@/shared/types';
import { useThemeColors } from '@/shared/hooks';
import { useAudioAnalyzer } from '../../hooks';
import { usePlayerStore } from '@/store/playerStore';
import { OscilloscopeCanvas } from './OscilloscopeCanvas';
import { BPMEstimator } from '../SyncGlowWave/metricsUtils';

interface SyncGlowOscilloscopeProps {
	genre: MusicGenre;
	isPlaying: boolean;
}

/**
 * 오실로스코프 효과 비주얼 컴포넌트
 * - 프라이머리 컬러로 통일
 * - 다크 모드: 밝은 프라이머리 컬러 (가시성 향상)
 * - 라이트 모드: 어두운 프라이머리 컬러 (가시성 향상)
 * - 중앙에서 바깥으로 퍼지는 원형 파형
 * - 주파수 데이터를 원형 오실로스코프로 표현
 * - 비트에 따라 파형 크기 변화
 */
export const SyncGlowOscilloscope = ({ genre: _genre, isPlaying }: SyncGlowOscilloscopeProps) => {
	const colors = useThemeColors();
	const currentTrack = usePlayerStore((state) => state.getCurrentTrack());

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

	// 프라이머리 컬러 팔레트
	// 다크 모드: 밝은 프라이머리 (primary-400, primary-300, primary-100)
	// 라이트 모드: 중간 톤 프라이머리 (primary-400, primary-500, primary-600)
	const palette = useMemo(() => {
		if (colors.isDark) {
			// 다크 모드: 밝은 색상 (배경이 어두우므로 밝은 색이 잘 보임)
			return ['#fb7185', '#fca5a5', '#fee2e2']; // primary-400, primary-300, primary-100
		} else {
			// 라이트 모드: primary-500, primary-600, primary-700
			return ['#fb7185', '#f43f5e', '#e11d48']; // primary-500, primary-600, primary-700
		}
	}, [colors.isDark]);

	return (
		<div className="fixed inset-0 z-0 flex items-center justify-center">
			<motion.div
				className="w-full h-full overflow-hidden relative"
				style={{
					background: 'transparent',
					border: 'none',
				}}
			>
				{/* 오실로스코프 Canvas */}
				<OscilloscopeCanvas
					isPlaying={isPlaying}
					isDark={colors.isDark}
					palette={palette}
					lowEnergy={audioAnalysis.lowBandEnergy}
					midEnergy={audioAnalysis.midBandEnergy}
					highEnergy={audioAnalysis.highBandEnergy}
					beatLevel={audioAnalysis.beatLevel}
					rms={audioAnalysis.rms}
					bpm={bpm}
				/>
			</motion.div>
		</div>
	);
};
