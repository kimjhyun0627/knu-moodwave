import { useState, useEffect } from 'react';
import { HORIZONTAL_MAX_WIDTH_RATIO, DEFAULT_HORIZONTAL_MAX_WIDTH } from '../constants/parameterPanelConstants';

/**
 * 윈도우 높이 추적 및 가로 모드 최대 너비 계산 커스텀 훅
 */
export const useWindowHeight = () => {
	const [initialWindowHeight, setInitialWindowHeight] = useState(0);
	const [windowHeight, setWindowHeight] = useState(0);

	// 초기 화면 높이 추적 (너비 계산용, 한 번만 설정)
	useEffect(() => {
		if (initialWindowHeight === 0) {
			setInitialWindowHeight(window.innerHeight);
		}
	}, [initialWindowHeight]);

	// 현재 화면 높이 추적 (반응형)
	useEffect(() => {
		const handleResize = () => {
			setWindowHeight(window.innerHeight);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// 가로 모드에서 초기 화면 높이에 비례한 maxWidth 계산 (초기 높이의 80% 정도, 이후 고정)
	const horizontalMaxWidth = initialWindowHeight > 0 ? initialWindowHeight * HORIZONTAL_MAX_WIDTH_RATIO : DEFAULT_HORIZONTAL_MAX_WIDTH;

	return {
		initialWindowHeight,
		windowHeight,
		horizontalMaxWidth,
	};
};
