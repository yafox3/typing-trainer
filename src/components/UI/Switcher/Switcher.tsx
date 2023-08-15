import { observer } from 'mobx-react-lite'
import css from './Switcher.module.css'
import configState from '../../../store/configState'

const Switcher = observer(() => {
	return (
		<div
			id='switch'
			title='if enabled, sounds will play when you start typing'
			onClick={() => configState.togglePlaySound()}
			className={
				configState.getPlaySound ? css.switcher.concat(' ', css.active) : css.switcher
			}>
			<div
				className={
					configState.getPlaySound
						? css.stateCircle.concat(' ', css.active)
						: css.stateCircle
				}></div>
		</div>
	)
})

export default Switcher
