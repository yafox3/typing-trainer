import React from 'react'
import css from './ReloadButton.module.css'

interface ReloadButtonProps {
	onClick: () => void
	sx?: {}
}

const ReloadButton = ({onClick, sx} : ReloadButtonProps) => {
	return (
		<div
			className={css.reload}
			onClick={onClick}
			style={sx}
			>
			<i className='bi bi-arrow-clockwise'></i>
		</div>
	)
}

export default ReloadButton
