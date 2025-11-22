import { useEffect, useRef } from 'react';

/**
 * setTimeout을 안전하게 관리하는 커스텀 훅
 * 컴포넌트 언마운트 시 자동으로 타이머를 정리합니다.
 */
export const useTimeout = (callback: () => void, delay: number | null): (() => void) => {
	const savedCallback = useRef<() => void>(callback);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// 콜백 함수를 ref에 저장
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// 타이머 설정 및 정리
	useEffect(() => {
		if (delay === null) {
			return;
		}

		timeoutRef.current = setTimeout(() => {
			savedCallback.current?.();
		}, delay);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, [delay]);

	// 수동으로 타이머를 취소할 수 있는 함수 반환
	return () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};
};
