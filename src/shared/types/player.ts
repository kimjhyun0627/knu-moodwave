// Audio Parameters for AI Generation
export interface AudioParams {
	energy: number; // 0-100
	bass: number; // 0-100
	tempo: number; // 60-200 BPM
}

// Track Status
export type TrackStatus = 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'error';

// Audio Track
export interface Track {
	id: string;
	title: string;
	genre: string;
	genreKo: string;
	audioUrl?: string;
	duration?: number; // in seconds
	status: TrackStatus;
	params: AudioParams;
	createdAt: Date;
}

// Audio Queue
export interface AudioQueue {
	current: Track | null;
	next: Track | null;
	history: Track[];
}

// Visualizer Type
export type VisualizerType = 'pulse' | 'club' | 'minimal';

// Player State
export interface PlayerState {
	isPlaying: boolean;
	volume: number; // 0-100
	currentTime: number; // in seconds
	duration: number; // in seconds
	visualizerType: VisualizerType;
}

// Music Generation Request
export interface MusicGenerationRequest {
	genre: string;
	params: AudioParams;
}

// Music Generation Response
export interface MusicGenerationResponse {
	trackId: string;
	audioUrl: string;
	duration: number;
}

