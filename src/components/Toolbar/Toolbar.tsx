import { observer } from 'mobx-react-lite'
import configState from '../../store/configState'
import toolbarState from '../../store/toolbarState'
import css from './Toolbar.module.css'
import { useQuery } from '../../hooks/useQuery'
import { WordsService } from '../../API/WordsService'
import testState from '../../store/testState'

const Toolbar = observer(() => {
	const {fetching, loading, error} = useQuery(async () => {
		const responseWords = await WordsService.getWords(configState.getWordsCount, configState.getWordLength)
		testState.setWords = responseWords
	})

	const categoryHandler = (v: string) => {
		toolbarState.setCategory = v
	}

	const optionHandler = (v: number) => {
		toolbarState.setOption = v
		fetching()
	}

  return (
	<div className={testState.getIsStarted ? css.toolbar.concat(' ', css.hidden) : css.toolbar}>
	  		<div className={css.body}>
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
