// Base Unsplash types
export interface UnsplashUser {
	id: string
	username: string
	name: string
	first_name: string
	last_name: string | null
	bio: string | null
	location: string | null
	portfolio_url: string | null
	links: {
		self: string
		html: string
		photos: string
	}
	profile_image: {
		small: string
		medium: string
		large: string
	}
	social: {
		instagram_username: string | null
		portfolio_url: string | null
		twitter_username: string | null
	}
}

export interface UnsplashPhoto {
	id: string
	slug: string
	created_at: string
	updated_at: string
	width: number
	height: number
	color: string
	blur_hash: string
	description: string | null
	alt_description: string | null
	urls: {
		raw: string
		full: string
		regular: string
		small: string
		thumb: string
		small_s3: string
	}
	links: {
		self: string
		html: string
		download: string
		download_location: string
	}
	likes: number
	user: UnsplashUser
	tags?: Array<{
		type: string
		title: string
	}>
}

// Query parameters
export interface PhotoQueryParams {
	query?: string
	page?: number
	per_page?: number
	order_by?: 'latest' | 'oldest' | 'popular' | 'relevant'
	orientation?: 'landscape' | 'portrait' | 'squarish'
	color?:
		| 'black_and_white'
		| 'black'
		| 'white'
		| 'yellow'
		| 'orange'
		| 'red'
		| 'purple'
		| 'magenta'
		| 'green'
		| 'teal'
		| 'blue'
	content_filter?: 'low' | 'high'
}
