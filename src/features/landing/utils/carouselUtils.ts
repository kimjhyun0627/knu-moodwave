import { CAROUSEL_CONSTANTS } from '../constants';

/**
 * 원형 구조를 위한 상대 인덱스 계산
 */
export const getRelativeIndex = (index: number, currentIndex: number, total: number): number => {
	let diff = index - currentIndex;
	if (diff > total / 2) diff -= total;
	if (diff < -total / 2) diff += total;
	return diff;
};

/**
 * 카드 위치 계산
 */
interface Position {
	x: number;
	scale: number;
	opacity: number;
	zIndex: number;
}

export const calculateCardPosition = (relativeIndex: number, isActive: boolean, isVisible: boolean, effectiveRange: number): Position => {
	const { POSITION, Z_INDEX } = CAROUSEL_CONSTANTS;

	if (!isVisible) {
		const offset = relativeIndex < 0 ? -POSITION.HIDDEN_OFFSET : POSITION.HIDDEN_OFFSET;
		return {
			x: offset,
			scale: POSITION.HIDDEN_SCALE,
			opacity: POSITION.HIDDEN_OPACITY,
			zIndex: 0,
		};
	}

	if (isActive) {
		return {
			x: 0,
			scale: POSITION.ACTIVE_SCALE,
			opacity: POSITION.ACTIVE_OPACITY,
			zIndex: Z_INDEX.ACTIVE_CARD,
		};
	}

	const baseOffset = effectiveRange === 2 ? POSITION.BASE_OFFSET_RANGE_2 : POSITION.BASE_OFFSET_DEFAULT;
	const scale = POSITION.INACTIVE_SCALE;
	const zIndex = Z_INDEX.INACTIVE_CARD_BASE - Math.abs(relativeIndex);
	const opacity = POSITION.OPACITY_BASE + (zIndex / Z_INDEX.INACTIVE_CARD_BASE) * POSITION.OPACITY_RANGE;

	// 가장자리 카드 조정
	if (effectiveRange === 2 && Math.abs(relativeIndex) === 2) {
		const adjustedOffset = baseOffset * POSITION.EDGE_OFFSET_MULTIPLIER;
		return {
			x: relativeIndex * adjustedOffset,
			scale: scale - Math.abs(relativeIndex) * POSITION.SCALE_DECREMENT,
			opacity,
			zIndex,
		};
	}

	return {
		x: relativeIndex * baseOffset,
		scale: scale - Math.abs(relativeIndex) * POSITION.SCALE_DECREMENT,
		opacity,
		zIndex,
	};
};

/**
 * 캐러셀 네비게이션 버튼의 오프셋을 계산합니다.
 * @param windowWidth - 현재 윈도우 너비
 * @param effectiveRange - 표시할 카드 범위 (양쪽으로 몇 개씩)
 * @returns 버튼 오프셋 값 (픽셀)
 */
export const calculateButtonOffset = (windowWidth: number, effectiveRange: number): number => {
	const safeWidth = windowWidth || 1280;
	const spacing = safeWidth >= 1280 ? 72 : safeWidth >= 1024 ? 56 : safeWidth >= 768 ? 40 : 28;

	const clampOffset = (value: number) => {
		if (!windowWidth) return value;
		const maxOffset = Math.max(windowWidth / 2 - 40, 120);
		return Math.min(value, maxOffset);
	};

	if (effectiveRange <= 0) {
		const activeWidth = Math.min(safeWidth * 0.9, 450);
		return clampOffset(activeWidth / 2 + spacing);
	}

	const inactiveBaseWidth = Math.min(safeWidth * 0.7, 380);

	if (effectiveRange === 1) {
		const baseOffset = 310;
		const sideScale = 0.7;
		const sideHalfWidth = (inactiveBaseWidth * sideScale) / 2;
		return clampOffset(baseOffset + sideHalfWidth + spacing);
	}

	const gap = safeWidth >= 768 ? 24 : 16;
	const buttonPadding = safeWidth >= 768 ? 12 : 8;
	const iconSize = safeWidth >= 768 ? 20 : 16;
	const buttonHalfSize = (buttonPadding * 2 + iconSize) / 2;
	const cardHalfWidth = inactiveBaseWidth / 2;
	const targetOffset = cardHalfWidth + gap + buttonHalfSize;
	const adjustedOffset = targetOffset * 0.85;
	const farSideHalfWidth = (inactiveBaseWidth * 0.6) / 2;

	return clampOffset(adjustedOffset * 2 + farSideHalfWidth + spacing);
};
