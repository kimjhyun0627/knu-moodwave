import { motion, AnimatePresence } from 'framer-motion';
import { useThemeColors } from '@/shared/hooks';
import { PLAYER_CONSTANTS } from '../../constants';

interface GradientOverlayProps {
	isVisible: boolean;
	type: 'genreChange' | 'exit';
	zIndex?: number;
}

export const GradientOverlay = ({ isVisible, type, zIndex = 150 }: GradientOverlayProps) => {
	const colors = useThemeColors();
	const isDark = colors.isDark;

	// as const로 인한 타입 추론 제한을 우회하기 위해 타입 단언 사용
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const animations = PLAYER_CONSTANTS.ANIMATIONS as Record<string, any>;
	const animationConfig = type === 'genreChange' ? animations.genreChange : animations.exit;
	const gradientConfig = type === 'genreChange' ? PLAYER_CONSTANTS.GRADIENTS.genreChange : PLAYER_CONSTANTS.GRADIENTS.exit;
	const circleConfig = type === 'genreChange' ? PLAYER_CONSTANTS.GRADIENTS.circle : PLAYER_CONSTANTS.GRADIENTS.exitCircle;

	// animationConfig가 undefined인 경우를 대비한 안전장치
	if (!animationConfig || !animationConfig.overlay || !animationConfig.circle) {
		return null;
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					key={`${type}-overlay`}
					className="fixed inset-0 flex items-center justify-center"
					{...(animationConfig.overlay as Record<string, unknown>)}
					style={{
						zIndex,
						background: isDark ? gradientConfig.dark : gradientConfig.light,
					}}
				>
					<motion.div
						className="w-40 h-40 rounded-full"
						{...(animationConfig.circle as Record<string, unknown>)}
						style={{
							background: isDark ? circleConfig.dark.background : circleConfig.light.background,
							boxShadow: isDark ? circleConfig.dark.boxShadow : circleConfig.light.boxShadow,
						}}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
