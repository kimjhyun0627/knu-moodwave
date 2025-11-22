import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { MusicGenre } from '@/shared/types';
import { useThemeColors } from '@/shared/hooks';
import { useAudioAnalyzer } from '../../hooks';
import { ParticleCanvas } from './ParticleCanvas';

interface SyncGlowParticleProps {
	genre: MusicGenre;
	isPlaying: boolean;
}

/**
 * 테마 팔레트 + 오디오 기반 파티클 비주얼 컴포넌트
 * - 프라이머리 컬러로 통일
 * - 다크 모드: 밝은 프라이머리 컬러 (가시성 향상)
 * - 라이트 모드: 어두운 프라이머리 컬러 (가시성 향상)
 * - 비트·주파수 데이터로 입자, 라인, 네온 스트로크 변형
 * - 고주파 증가 시 입자 속도 상승
 */
export const SyncGlowParticle = ({ genre: _genre, isPlaying }: SyncGlowParticleProps) => {
	const colors = useThemeColors();

	// 오디오 분석 (재생 중일 때만 활성화)
	const audioAnalysis = useAudioAnalyzer(isPlaying);

	// 프라이머리 컬러 팔레트 (오실로스코프와 동일)
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
				{/* 파티클 Canvas */}
				<ParticleCanvas
					isPlaying={isPlaying}
					isDark={colors.isDark}
					palette={palette}
					lowEnergy={audioAnalysis.lowBandEnergy}
					midEnergy={audioAnalysis.midBandEnergy}
					highEnergy={audioAnalysis.highBandEnergy}
					beatLevel={audioAnalysis.beatLevel}
					rms={audioAnalysis.rms}
				/>
			</motion.div>
		</div>
	);
};
