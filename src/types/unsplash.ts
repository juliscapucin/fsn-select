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

export interface UnsplashCollection {
	id: string
	title: string
	description: string | null
	published_at: string
	last_collected_at: string
	updated_at: string
	total_photos: number
	private: boolean
	share_key: string | null
	cover_photo: UnsplashPhoto | null
	preview_photos: UnsplashPhoto[]
	user: UnsplashUser
	links: {
		self: string
		html: string
		photos: string
	}
}

export interface UnsplashSearchResult<T> {
	total: number
	total_pages: number
	results: T[]
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

export interface CollectionQueryParams {
	page?: number
	per_page?: number
}

// Fashion & Beauty specific types
export type FashionCategory =
	| 'fashion'
	| 'beauty'
	| 'makeup'
	| 'skincare'
	| 'style'
	| 'editorial'

export interface FashionBeautyQuery extends PhotoQueryParams {
	category?: FashionCategory
	keywords?: string[]
}
