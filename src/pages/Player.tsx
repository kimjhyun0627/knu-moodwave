import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { usePlayerStore } from '@/store/playerStore';
import { ConfirmModal } from '@/shared/components/ui';
import { PlayerTopBar, PlayerGenreInfo, PlayerCenterImage, PlayerControls, ParameterPanel } from '@/features/player/components';
import { usePlayerParams } from '@/features/player/hooks';
import { useThemeColors } from '@/shared/hooks';
import { PLAYER_CONSTANTS } from '@/features/player/constants';

const Player = () => {
	const navigate = useNavigate();
	const [isExpanded, setIsExpanded] = useState(false);
	const [isControlsVisible, setIsControlsVisible] = useState(true);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [isLeaving, setIsLeaving] = useState(false);

	const { selectedGenre, isPlaying } = usePlayerStore();
	const { selectedTheme, themeBaseParams, themeAdditionalParams, activeCommonParamsList, availableCommonParams, getParamValue, setParamValue, addCommonParam, removeCommonParam, removeThemeParam } =
		usePlayerParams();
	const colors = useThemeColors();

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | null = null;
		if (isLeaving) {
			timer = setTimeout(() => {
				navigate('/');
			}, 700);
		}
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [isLeaving, navigate]);

	// 장르가 선택되지 않았으면 랜딩 페이지로 리다이렉트
	useEffect(() => {
		if (!selectedGenre) {
			navigate('/');
		}
	}, [selectedGenre, navigate]);

	if (!selectedGenre) {
		return null;
	}

	const handleHomeClick = () => {
		setShowConfirmModal(true);
	};

	const handleConfirmHome = () => {
		setShowConfirmModal(false);
		setIsLeaving(true);
	};

	const handleCancelHome = () => {
		setShowConfirmModal(false);
	};

	const handlePrev = () => {
		// TODO: 이전 트랙으로 이동
	};

	const handleNext = () => {
		// TODO: 다음 트랙으로 이동
	};

	return (
		<>
			<div className="min-h-screen flex flex-col relative overflow-hidden">
				{/* Top Bar */}
				<PlayerTopBar
					onHomeClick={handleHomeClick}
					isVisible={isControlsVisible}
				/>

				{/* Genre Info */}
				<PlayerGenreInfo
					genre={selectedGenre}
					theme={selectedTheme}
					isVisible={isControlsVisible}
				/>

				{/* Center Image */}
				<PlayerCenterImage
					genre={selectedGenre}
					isPlaying={isPlaying}
				/>

				{/* Bottom - Player Board */}
				<div className="fixed bottom-6 left-4 right-4 z-50 flex justify-center">
					<div
						className="relative w-full max-w-[720px]"
						style={{ overflow: isExpanded ? 'visible' : undefined }}
					>
						{/* Main Player Controls */}
						<motion.div
							layout
							initial="hidden"
							animate={isControlsVisible ? 'visible' : 'hidden'}
							variants={PLAYER_CONSTANTS.ANIMATIONS.playerControls}
							transition={{
								layout: {
									duration: 0.6,
									ease: [0.4, 0, 0.2, 1],
								},
								default: {
									duration: 0.6,
									ease: [0.4, 0, 0.2, 1],
								},
							}}
							style={{
								background: colors.glassBackground,
								borderColor: colors.glassBorder,
							}}
							className="w-full rounded-2xl backdrop-blur-xl border shadow-2xl relative z-10 mt-4"
						>
							<PlayerControls
								genre={selectedGenre}
								isExpanded={isExpanded}
								isVisible={isControlsVisible}
								onToggleExpand={() => setIsExpanded(!isExpanded)}
								onToggleVisibility={() => setIsControlsVisible(!isControlsVisible)}
								onPrev={handlePrev}
								onNext={handleNext}
							/>
						</motion.div>

						{/* Expandable Detail Controls - Behind the controller */}
						{isControlsVisible && (
							<ParameterPanel
								isExpanded={isExpanded}
								themeBaseParams={themeBaseParams}
								themeAdditionalParams={themeAdditionalParams}
								activeCommonParams={activeCommonParamsList}
								availableCommonParams={availableCommonParams}
								getParamValue={getParamValue}
								setParamValue={setParamValue}
								onRemoveThemeParam={removeThemeParam}
								onRemoveCommonParam={removeCommonParam}
								onAddCommonParam={addCommonParam}
							/>
						)}
					</div>
				</div>

				{/* 컨트롤러 패널 열기 버튼 - 오른쪽 아래 고정 */}
				<AnimatePresence>
					{!isControlsVisible && (
						<motion.button
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{
								opacity: {
									duration: 0.25,
									ease: [0.4, 0, 0.2, 1],
								},
								y: {
									type: 'spring',
									stiffness: 300,
									damping: 25,
								},
							}}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setIsControlsVisible(true)}
							className={PLAYER_CONSTANTS.STYLES.glassButton.controlButton}
							style={{
								background: colors.glassButtonBg,
								borderColor: colors.glassBorder,
								position: 'fixed',
								bottom: '1.5rem',
								right: '1.5rem',
								zIndex: 60,
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = colors.glassButtonBgHover;
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = colors.glassButtonBg;
							}}
							aria-label="컨트롤러 보이기"
						>
							<ChevronUp
								className="w-6 h-6 md:w-7 md:h-7"
								style={{ color: colors.iconColor }}
							/>
						</motion.button>
					)}
				</AnimatePresence>
			</div>

			<AnimatePresence>
				{isLeaving && (
					<motion.div
						key="player-exit-overlay"
						className="fixed inset-0 z-200 flex items-center justify-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						style={{
							background: colors.isDark
								? 'linear-gradient(140deg, rgba(15,23,42,0.95), rgba(67,56,202,0.85))'
								: 'linear-gradient(140deg, rgba(255,255,255,0.95), rgba(191,219,254,0.85))',
						}}
						transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0.2 }}
							animate={{ scale: 1.2, opacity: 0.9 }}
							transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
							className="w-40 h-40 rounded-full"
							style={{
								background: colors.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(148,163,184,0.2)',
								boxShadow: colors.isDark ? '0 0 80px rgba(167, 139, 250, 0.35)' : '0 0 80px rgba(99, 102, 241, 0.3)',
							}}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Confirm Modal */}
			<ConfirmModal
				isOpen={showConfirmModal}
				title="홈으로 돌아가기"
				message="정말 돌아가시겠어요?"
				confirmText="돌아가기"
				cancelText="취소"
				onConfirm={handleConfirmHome}
				onCancel={handleCancelHome}
			/>
		</>
	);
};

export default Player;
