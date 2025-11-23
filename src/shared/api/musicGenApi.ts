import { RequestQueue } from '@/shared/audio';
import type { MusicGenre } from '../types';

const MUSICGEN_API_URL = import.meta.env.VITE_MUSICGEN_API_URL;
const DEFAULT_MUSIC_LENGTH_SEC = 47;
const DEFAULT_TEMPERATURE = 1.0;
const DEFAULT_SEED = -1;

const requestQueue = new RequestQueue();

export interface MusicGenTrack {
	id: string;
	title: string;
	audioUrl: string;
	duration: number;
}

/**
 * 카테고리별 음악 분위기를 정의합니다.
 */
const CATEGORY_MOODS: Record<string, string> = {
	focus: 'calm, focused, ambient, peaceful, concentration-enhancing',
	energy: 'energetic, upbeat, dynamic, powerful, exciting',
	relax: 'relaxing, peaceful, soothing, gentle, tranquil',
	mood: 'emotional, atmospheric, expressive, evocative',
	workout: 'intense, motivating, powerful, driving, pumping',
};

/**
 * MusicGenre 정보를 바탕으로 상세한 프롬프트를 생성합니다.
 */
const buildMusicPrompt = (genre: MusicGenre, activeParams?: Record<string, number>): string => {
	const parts: string[] = [];

	// 1. 장르명
	parts.push(`${genre.name} music`);

	// 2. 카테고리 기반 분위기
	const mood = CATEGORY_MOODS[genre.category];
	if (mood) {
		parts.push(mood);
	}

	// 3. 파라미터 적용
	if (activeParams && Object.keys(activeParams).length > 0) {
		const paramDescriptions = Object.entries(activeParams).map(([key, value]) => {
			return `${key}: ${value}`;
		});
		parts.push(...paramDescriptions);
	}

	// 4. 기본 특성
	parts.push('instrumental background, high quality production');

	return parts.join(', ');
};

export const generateSoundByGenre = async (genre: MusicGenre, signal?: AbortSignal, activeParams?: Record<string, number>, priority: number = 0): Promise<MusicGenTrack> => {
	return requestQueue.enqueue(async () => {
		const prompt = buildMusicPrompt(genre, activeParams);

		const queryParams = new URLSearchParams({
			prompt: prompt,
			temperature: DEFAULT_TEMPERATURE.toString(),
			seed: DEFAULT_SEED.toString(),
		});

		const fetchStartTime = performance.now();
		const response = await fetch(`${MUSICGEN_API_URL}?${queryParams.toString()}`, {
			method: 'GET',
			signal,
		});

		const fetchEndTime = performance.now();
		const fetchDuration = fetchEndTime - fetchStartTime;

		if (!response.ok) throw new Error(`API failed: ${response.status}`);

		// Response 헤더 정보 확인 (진단용)
		const contentLength = response.headers.get('content-length');
		const contentType = response.headers.get('content-type');
		const transferEncoding = response.headers.get('transfer-encoding');
		
		console.log('[MusicGen API] Response 정보:', {
			status: response.status,
			contentLength: contentLength ? `${(parseInt(contentLength) / 1024 / 1024).toFixed(2)} MB` : 'unknown',
			contentType,
			transferEncoding,
			fetchDuration: `${(fetchDuration / 1000).toFixed(2)}초`,
		});

		const blobStartTime = performance.now();
		const audioBlob = await response.blob();
		const blobEndTime = performance.now();
		const blobDuration = blobEndTime - blobStartTime;

		console.log('[MusicGen API] Blob 다운로드:', {
			blobSize: `${(audioBlob.size / 1024 / 1024).toFixed(2)} MB`,
			blobDuration: `${(blobDuration / 1000).toFixed(2)}초`,
			downloadSpeed: audioBlob.size > 0 ? `${((audioBlob.size / 1024 / 1024) / (blobDuration / 1000)).toFixed(2)} MB/s` : 'N/A',
		});

		const audioUrl = URL.createObjectURL(audioBlob);

		return {
			id: `musicgen-${Date.now()}`,
			title: `AI Generated ${genre.nameKo}`,
			audioUrl: audioUrl,
			duration: DEFAULT_MUSIC_LENGTH_SEC,
		};
	}, signal, priority);
};
