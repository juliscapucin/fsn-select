export default function handleError(error: unknown): {
	type: 'not_found' | 'api_error' | 'network_error' | 'rate_limit'
	message: string
} | null {
	// Specific error handling based on error type
	if (error instanceof Error) {
		if (error.message.includes('404')) {
			return {
				type: 'not_found',
				message: `Page not found. Please check the spelling or try a different page.`,
			}
		} else if (
			error.message.includes('403') ||
			error.message.includes('rate limit')
		) {
			return {
				type: 'rate_limit',
				message: `We're currently experiencing high traffic. Please try again in a few minutes.`,
			}
		} else if (
			error.message.includes('500') ||
			error.message.includes('502') ||
			error.message.includes('503')
		) {
			return {
				type: 'api_error',
				message: `Our image service is temporarily unavailable. Please try again in a few minutes.`,
			}
		} else {
			return {
				type: 'network_error',
				message: `Unable to load images. Please check your internet connection and try again.`,
			}
		}
	}

	// Return null for non-Error instances
	return null
}
