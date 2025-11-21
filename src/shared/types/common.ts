// Theme Mode (Light/Dark)
export type ThemeMode = 'light' | 'dark';

// API Response
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
}
