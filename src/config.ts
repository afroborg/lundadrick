export const config = {
	API_URL: (import.meta.env.VITE_API_URL as string) ?? '',
	STRIPE_API_KEY: (import.meta.env.VITE_STRIPE_API_KEY as string) ?? ''
};
