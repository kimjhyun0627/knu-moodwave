import type { MusicGenre, Track } from '@/shared/types';
// import { fetchFreesoundPreviewByGenre } from './freesoundApi';
import { generateSoundByGenre } from './musicGenApi';

export const fetchTrackForGenre = async (genre: MusicGenre, signal?: AbortSignal, activeParams?: Record<string, number>, priority: number = 0): Promise<Track> => {
	// 활성화된 파라미터들을 API body로 전송할 데이터로 구성
	/* if (activeParams) {
		const params = {
			genre: genre.name,
			genreId: genre.id,
			parameters: activeParams,
		};
		console.log(JSON.stringify(params, null, 2));
		console.log(`📊 Active parameters count: ${Object.keys(activeParams).length}`);
	} */

	const preview = await generateSoundByGenre(genre, signal, activeParams, priority);

	return {
		id: preview.id,
		title: preview.title,
		genre: genre.name,
		genreKo: genre.nameKo,
		audioUrl: preview.audioUrl,
		duration: preview.duration,
		status: 'ready',
		createdAt: new Date(),
	};
};
