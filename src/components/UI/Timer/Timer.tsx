import React from 'react'
import css from './Timer.module.css'

interface TimerProps {
	seconds: number
	setSeconds: () => void
	start: boolean
}

const Timer = ({ seconds, setSeconds, start }: TimerProps) => {
	const startTimer = () => {
		!seconds && setInterval(() => {
			setSeconds()
		}, 1000)
	}

	React.useEffect(() => {
		start && startTimer()
	}, [start])

	return <div className={css.timer.concat(' ', start ? css.active : '')}>{seconds}</div>
}

export default Timer
