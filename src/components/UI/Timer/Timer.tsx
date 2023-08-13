import { observer } from 'mobx-react-lite'
import React from 'react'
import configState from '../../../store/configState'
import css from './Timer.module.css'
import testState from '../../../store/testState'

interface TimerProps {
	start: boolean
}

const Timer = observer(({ start }: TimerProps) => {
	const startTimer = () => {
		const timer = setInterval(() => {
			if (testState.getTimer === configState.getSeconds || testState.getEnteredWords === configState.getWordsCount) {
				clearInterval(timer)
			} else {
				testState.setTimer = testState.getTimer + 1
			}
		}, 1000)
	}

	React.useEffect(() => {
		start && startTimer()
	}, [start])

	return <div className={css.timer.concat(' ', start ? css.active : '')}>{testState.getTimer}</div>
})

export default Timer
