// Music Theme Categories
export type ThemeCategory = 'focus' | 'energy' | 'relax' | 'mood' | 'workout';

// Music Genre
export interface MusicGenre {
	id: string;
	name: string;
	nameKo: string;
	category: ThemeCategory;
	description?: string;
	image?: string; // 장르 이미지 경로
}

// Category Parameter
export interface CategoryParameter {
	id: string;
	name: string;
	nameKo: string;
	description?: string; // 파라미터 설명
	min: number;
	max: number;
	default: number;
	unit: string;
}

// Music Theme
export interface MusicTheme {
	category: ThemeCategory;
	categoryName: string;
	categoryNameKo: string;
	description?: string; // 카테고리 설명
	emoji: string;
	image?: string; // 카테고리 이미지 경로 (import된 이미지 URL)
	parameters: CategoryParameter[];
	genres: MusicGenre[];
}

