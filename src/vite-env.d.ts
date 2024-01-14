/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_PORT: number;
	readonly VITE_SWR_NOTE_DEDUPING_INTERVAL_MINUTES: number;
	readonly VITE_SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES: number;
	readonly VITE_SWR_TAG_DEDUPING_INTERVAL_MINUTES: number;
	readonly VITE_SWR_TAG_LIST_REFRESH_INTERVAL_MINUTES: number;
	readonly VITE_SWR_USER_DEDUPING_INTERVAL_MINUTES: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
