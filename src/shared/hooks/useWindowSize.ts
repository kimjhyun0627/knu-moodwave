import { useState, useEffect } from 'react';

/**
 * 윈도우 크기를 추적하는 커스텀 훅
 * @returns { width, height } 윈도우의 너비와 높이
 */
export const useWindowSize = () => {
	const [size, setSize] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0,
	});

	useEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return size;
};

/**
 * 윈도우 너비만 추적하는 커스텀 훅 (하위 호환성)
 * @returns 윈도우 너비
 */
export const useWindowWidth = () => {
	const { width } = useWindowSize();
	return width;
};

