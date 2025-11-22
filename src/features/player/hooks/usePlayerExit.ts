import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 플레이어 페이지 나가기 애니메이션 및 네비게이션 관리 커스텀 훅
 */
export const usePlayerExit = () => {
	const navigate = useNavigate();
	const [isLeaving, setIsLeaving] = useState(false);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | null = null;
		if (isLeaving) {
			// 애니메이션이 완전히 보이도록 충분한 시간 확보
			// exit 애니메이션: initial → animate (0.65초) + animate 상태 유지 (0.5초) = 1.15초
			// 총 1.2초 후에 navigate 호출하여 애니메이션이 충분히 보이도록 함
			timer = setTimeout(() => {
				navigate('/');
			}, 1200);
		}
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [isLeaving, navigate]);

	const startExit = () => {
		setIsLeaving(true);
	};

	return { isLeaving, startExit };
};
