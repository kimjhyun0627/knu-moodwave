import { useMemo } from 'react';
import { useThemeStore } from '@/store/themeStore';

export type ThemeColors = {
	isDark: boolean;
	iconColor: string;
	textSecondaryColor: string;
	textMutedColor: string;
	glassBackground: string;
	glassBorder: string;
	glassButtonBg: string;
	glassButtonBgHover: string;
	playButtonGradient: string;
	parameterPanelBg: string;
	parameterButtonBg: string;
};

/**
 * 테마에 따른 색상 값을 반환하는 커스텀 훅
 */
export const useThemeColors = (): ThemeColors => {
	const theme = useThemeStore((state) => state.theme);
	const isDark = theme === 'dark';

	return useMemo(
		() => ({
			isDark,
			iconColor: isDark ? '#cbd5e1' : '#334155', // slate-300 : slate-700
			textSecondaryColor: isDark ? '#cbd5e1' : '#475569', // slate-300 : slate-600
			textMutedColor: isDark ? '#e2e8f0' : '#334155', // slate-200 : slate-700
			glassBackground: isDark ? 'rgba(28, 25, 23, 0.2)' : 'rgba(254, 248, 242, 0.3)',
			glassBorder: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.12)',
			glassButtonBg: isDark ? 'rgba(28, 25, 23, 0.4)' : 'rgba(254, 248, 242, 0.5)',
			glassButtonBgHover: isDark ? 'rgba(28, 25, 23, 0.55)' : 'rgba(254, 248, 242, 0.5)',
			playButtonGradient: isDark ? 'linear-gradient(to bottom right, #f43f5e, #e11d48)' : 'linear-gradient(to bottom right, #fb7185, #f43f5e)',
			parameterPanelBg: isDark ? 'rgba(28, 25, 23, 0.8)' : 'rgba(254, 248, 242, 0.3)',
			parameterButtonBg: isDark ? 'rgba(28, 25, 23, 0.4)' : 'rgba(254, 248, 242, 0.2)',
		}),
		[isDark]
	);
};
