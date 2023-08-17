import { observer } from 'mobx-react-lite'
import statsState from '../../store/statsState'
import ReloadButton from '../UI/ReloadButton/ReloadButton'
import css from './Stats.module.css'

const Stats = observer(() => {
  return (
	<div className={css.stats}>
		<div className="container">
			<div className={css.inner}>
				<h5 className={css.title}>Statistics</h5>
	
				<div className={css.statsBody}>
					<div className={css.wpm}>
						<div>wpm</div>
						<span>{statsState.getWpm}</span>
					</div>					
					<div className={css.acc}>
						<div>acc</div>
						<span>{statsState.getAcc}%</span>
					</div>					
					<div className={css.chars}>
						<div>characters</div>
						<span>{statsState.getCorrectChars}/{statsState.getIncorrectChars}</span>
						<div className={css.charsTip}>correct, incorrect</div>
					</div>
				</div>

				<ReloadButton onClick={() => statsState.setResultIsExist = false}/>
			</div>
		</div>
	</div>
  )
})

export default Stats
