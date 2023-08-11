import { useState } from 'react'

export const useQuery = (callback: () => void) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const fetching = async () => {
		try {
			setLoading(true)
			await callback()
		} catch (err: any) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}

	return {fetching, loading, error}
}