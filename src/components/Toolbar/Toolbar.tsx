import { observer } from 'mobx-react-lite'
import { WordsService } from '../../API/WordsService'
import { useQuery } from '../../hooks/useQuery'
import configState from '../../store/configState'
import testState from '../../store/testState'
import toolbarState from '../../store/toolbarState'
import Switcher from '../UI/Switcher/Switcher'
import css from './Toolbar.module.css'

const Toolbar = observer(() => {
	const {fetching, loading, error} = useQuery(async () => {
		const responseWords = await WordsService.getWords(configState.getWordsCount, configState.getWordLength)
		testState.setWords = responseWords
	})

	const categoryHandler = (v: string) => {
		if (!testState.getIsStarted) {
			toolbarState.setCategory = v
		}
	}

	const optionHandler = (v: number) => {
		if (!testState.getIsStarted) {
			toolbarState.setOption = v
			fetching()
		}
	}

  return (
	<div className={testState.getIsStarted ? css.toolbar.concat(' ', css.hidden) : css.toolbar}>
	  		<div style={{height: configState.getPlaySound ? 80 : '', width: configState.getPlaySound ? 550 : 450}} className={css.body}>

				<div className={css.sounds}>
					{configState.getPlaySound && 
						<div className={css.sliderWrapper}>
							<input 
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => configState.setVolume = Number.parseInt(event.target.value)}
								type="range" 
								min="1" 
								max="100" 
								defaultValue={configState.getVolume}
								className={css.slider}
								id='volume'
							/>
							<label htmlFor="volume">volume {configState.getVolume}</label>
						</div>
					}

					<Switcher />
					<b style={{color: configState.getPlaySound ? '#E2B714' : ''}}>mechvibes</b>
				</div>

				<div className={css.category}>
					<button 
						className={toolbarState.getCategory === 'words' ? css.btn.concat(' ', css.btn_active) : css.btn}
						onClick={() => categoryHandler('words')}
					>
						<i className="bi bi-type" style={{maxWidth: '11px', overflow: 'hidden', fontSize: '20px'}}></i>
						words
					</button>
					<button 
						className={toolbarState.getCategory === 'time' ? css.btn.concat(' ', css.btn_active) : css.btn}
						onClick={() => categoryHandler('time')}
					>
						<i className="bi bi-clock-fill"></i>
						time
					</button>
				</div>
	
				<div className={css.options}>
					{toolbarState.getCategory === 'words' 
						? <>
								<button 
									className={configState.getWordsCount === 10 ? css.btn.concat(' ', css.btn_active) : css.btn}
									onClick={() => optionHandler(10)}
								>
									10
								</button>
								<button 
									className={configState.getWordsCount === 20 ? css.btn.concat(' ', css.btn_active) : css.btn}
									onClick={() => optionHandler(20)}
								>
									20
								</button>
								<button 
									className={configState.getWordsCount === 30 ? css.btn.concat(' ', css.btn_active) : css.btn}
									onClick={() => optionHandler(30)}
								>
									30
								</button>
							</>
						: <>
							<button 
								className={configState.getSeconds === 15 ? css.btn.concat(' ', css.btn_active) : css.btn}
								onClick={() => optionHandler(15)}
							>
								15
							</button>
							<button 
								className={configState.getSeconds === 30 ? css.btn.concat(' ', css.btn_active) : css.btn}
								onClick={() => optionHandler(30)}
							>
								30
							</button>
							<button 
								className={configState.getSeconds === 60 ? css.btn.concat(' ', css.btn_active) : css.btn}
								onClick={() => optionHandler(60)}
							>
								60
							</button>
						</>
					}
				</div>
			</div>
	</div>
  )
})

export default Toolbar
