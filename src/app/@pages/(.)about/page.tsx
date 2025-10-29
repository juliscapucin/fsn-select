import { AboutPageServer } from '@/components/pages'

export default async function Page() {
	return (
		<div className='fixed inset-0 overflow-y-auto'>
			<AboutPageServer />
		</div>
	)
}
