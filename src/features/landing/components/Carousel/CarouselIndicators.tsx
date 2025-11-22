import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';
import { useWindowSize } from '@/shared/hooks';

interface CarouselIndicatorsProps {
	count: number;
	currentIndex: number;
	onSelect: (index: number) => void;
	labels?: string[];
}

export const CarouselIndicators = ({ count, currentIndex, onSelect, labels }: CarouselIndicatorsProps) => {
	const isDarkMode = useThemeStore((state) => state.theme === 'dark');
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const { height } = useWindowSize();

	// 화면 높이에 따라 동적으로 padding-top 계산 (최소 10px, 최대 48px)
	// 선형 보간: 화면 높이 400px → 10px, 화면 높이 1200px → 48px
	const minHeight = 400;
	const maxHeight = 1200;
	const minPadding = 10;
	const maxPadding = 48;

	const paddingTop = useMemo(() => {
		if (height <= minHeight) return minPadding;
		if (height >= maxHeight) return maxPadding;
		// 선형 보간
		const ratio = (height - minHeight) / (maxHeight - minHeight);
		return Math.round(minPadding + (maxPadding - minPadding) * ratio);
	}, [height]);

	const getIndicatorColor = (isActive: boolean) => {
		if (isActive) {
			return '#fb7185'; // primary-500 (로즈)
		}
		return isDarkMode ? 'rgba(241, 245, 249, 0.5)' : 'rgba(30, 41, 59, 0.5)'; // indicator-dark/50, indicator-light/50
	};

	const getHoverColor = (isActive: boolean) => {
		if (isActive) {
			return '#f43f5e'; // primary-600 (더 진한 로즈)
		}
		return isDarkMode ? 'rgba(241, 245, 249, 0.7)' : 'rgba(30, 41, 59, 0.7)'; // indicator-dark/70, indicator-light/70
	};

	return (
		<div
			className="flex items-center justify-center gap-1.5 pb-4"
			style={{ paddingTop: `${paddingTop}px` }}
		>
			{Array.from({ length: count }).map((_, index) => {
				const isActive = index === currentIndex;
				const label = labels?.[index] ?? `${index + 1}`;
				return (
					<button
						key={index}
						onClick={() => onSelect(index)}
						onMouseEnter={() => setHoveredIndex(index)}
						onMouseLeave={() => setHoveredIndex(null)}
						className="relative group px-0.5 py-3 border-0 outline-none focus:outline-none bg-transparent cursor-pointer min-h-[32px] flex items-center justify-center"
						aria-label={`${index + 1}번째 항목`}
					>
						<AnimatePresence>
							{hoveredIndex === index && (
								<motion.div
									key={`tooltip-${index}`}
									initial={{ opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 6 }}
									transition={{ duration: 0.18 }}
									className="absolute -top-1 -translate-y-full whitespace-nowrap px-2 py-0.5 text-xs font-semibold"
									style={{
										color: isDarkMode ? '#f8fafc' : '#0f172a', // 다크 모드: 밝은 색, 라이트 모드: 어두운 색
										textShadow: isDarkMode ? '0 1px 6px rgba(15, 23, 42, 0.8)' : '0 1px 4px rgba(148, 163, 184, 0.8)',
									}}
								>
									{label}
								</motion.div>
							)}
						</AnimatePresence>
						<motion.div
							className="rounded-full transition-all"
							style={{
								height: '6px',
								minWidth: '6px',
								backgroundColor: getIndicatorColor(isActive),
								backdropFilter: 'blur(4px)',
								WebkitBackdropFilter: 'blur(4px)',
								boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 1px 4px rgba(0, 0, 0, 0.1)',
							}}
							whileHover={{
								backgroundColor: getHoverColor(isActive),
								opacity: 0.9,
							}}
							initial={{
								width: isActive ? 20 : 6,
							}}
							animate={{
								width: isActive ? 20 : 6,
							}}
							transition={{
								type: 'spring',
								stiffness: 400,
								damping: 30,
							}}
						/>
					</button>
				);
			})}
		</div>
	);
};
