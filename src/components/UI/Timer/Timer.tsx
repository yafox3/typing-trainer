import { observer } from 'mobx-react-lite'
import testState from '../../../store/testState'
import css from './Timer.module.css'

interface TimerProps {
	start: boolean
}

const Timer = observer(({ start }: TimerProps) => {
	return <div className={css.timer.concat(' ', start ? css.active : '')}>{testState.getTimer}</div>
})

export default Timer
