interface MutationOptions<T> {
	onStart?: () => void;
	onSuccess?: (data: T) => void;
	onError?: (error: Error) => void;
	onSettled?: (data: T | null, error: Error | null) => void;
}

export default MutationOptions;
