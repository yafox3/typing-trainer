import {useState} from 'react'

export function useToggle(initValue: boolean = false) : [boolean, () => void]{
	const [isActive, setIsActive] = useState(initValue)

	const toggle = () => {
		setIsActive(prev => !prev)
	}

	return [isActive, toggle]
}