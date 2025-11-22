import { useEffect, useState, useRef } from 'react';
import type { MusicGenre } from '@/shared/types';
import { PLAYER_CONSTANTS } from '../constants';

/**
 * 장르 변경 감지 및 애니메이션 상태 관리 커스텀 훅
 */
export const useGenreChangeAnimation = (selectedGenre: MusicGenre | null) => {
	const [isGenreChanging, setIsGenreChanging] = useState(false);
	const prevGenreIdRef = useRef<string | null>(null);

	useEffect(() => {
		if (!selectedGenre) return;

		// 첫 렌더링이 아니고 장르가 변경된 경우
		if (prevGenreIdRef.current !== null && prevGenreIdRef.current !== selectedGenre.id) {
			setIsGenreChanging(true);
			// 페이드 인 후 페이드 아웃
			const timer = setTimeout(() => {
				setIsGenreChanging(false);
			}, PLAYER_CONSTANTS.TIMING.GENRE_CHANGE_DELAY);

			return () => {
				clearTimeout(timer);
			};
		}

		prevGenreIdRef.current = selectedGenre.id;
	}, [selectedGenre]);

	return isGenreChanging;
};
