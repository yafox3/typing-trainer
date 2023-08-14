import {useState} from 'react'

export function useSelect(initValue: string): [string, (value: string) => void] {
	const [selectedItem, setSelectedItem] = useState(initValue)
	
	const select = (value: string) => {
		setSelectedItem(value)
		console.log(value, selectedItem)
	}

	return [selectedItem, select]
}