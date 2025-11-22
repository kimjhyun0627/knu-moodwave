import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

interface TransitionOverlayProps {
	isVisible: boolean;
}

export const TransitionOverlay = ({ isVisible }: TransitionOverlayProps) => {
	const theme = useThemeStore((state) => state.theme);
	const isDark = theme === 'dark';
	const [dots, setDots] = useState('');

	useEffect(() => {
		if (!isVisible) return;

		const interval = setInterval(() => {
			setDots((prev) => {
				if (prev === '...') return '';
				return prev + '.';
			});
		}, 500);

		return () => clearInterval(interval);
	}, [isVisible]);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center"
					style={{
						background: isDark
							? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)'
							: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
						backdropFilter: 'blur(20px) saturate(180%)',
						WebkitBackdropFilter: 'blur(20px) saturate(180%)',
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<motion.div
						className="text-center space-y-8 px-8"
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
					>
						{/* 로더 */}
						{/* <div className="flex justify-center">
							<Loader size="lg" />
						</div> */}

						{/* 텍스트 */}
						<div className="space-y-2 min-w-[280px]">
							<motion.h2
								className="text-2xl md:text-3xl font-semibold"
								style={{
									color: isDark ? '#f1f5f9' : '#1e293b',
								}}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2, duration: 0.4 }}
							>
								AI가 음악을 생성하고 있어요{dots}
							</motion.h2>
							<motion.p
								className="text-base md:text-lg font-medium"
								style={{
									color: isDark ? '#94a3b8' : '#64748b',
								}}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3, duration: 0.4 }}
							>
								잠시만 기다려주세요
							</motion.p>
						</div>

						{/* 진행 바 - 인피니트 애니메이션 */}
						<motion.div
							className="w-full max-w-md mx-auto"
							style={{ width: '100%', minWidth: '280px', maxWidth: '448px' }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							<div
								className="w-full h-1.5 rounded-full overflow-hidden"
								style={{
									background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
								}}
							>
								<motion.div
									className="h-full rounded-full"
									style={{
										background: 'linear-gradient(90deg, transparent, #fb7185, transparent)',
										width: '40%',
									}}
									animate={{
										x: ['-100%', '300%'],
									}}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										ease: 'linear',
									}}
								/>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
