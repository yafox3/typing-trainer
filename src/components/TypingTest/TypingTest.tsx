import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { WordsService } from '../../API/WordsService'
import { useQuery } from '../../hooks/useQuery'
import configState from '../../store/configState'
import statsState from '../../store/statsState'
import testState from '../../store/testState'
import { playSound } from '../../utils/playSound'
import Stats from '../Stats/Stats'
import Loader from '../UI/Loader/Loader'
import ReloadButton from '../UI/ReloadButton/ReloadButton'
import Timer from '../UI/Timer/Timer'
import WordList from '../Words/WordList'
import css from './TypingTest.module.css'

const TypingTest = observer(() => {
	const wordsRef = useRef<HTMLDivElement | null>(null)
	const {fetching, loading, error} = useQuery(async () => {
		const responseWords = await WordsService.getWords(configState.getWordsCount, configState.getWordLength)
		testState.setWords = responseWords
	})
	let currentLetterIndex = 0
	let currentWordIndex = 0
	
	useEffect(() => {
		!testState.getIsStarted && fetching()
		document.addEventListener('keydown', typingHandler)
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (testState.getTimer === configState.getSeconds) {
			testState.stopTest(fetching)
		}
		// eslint-disable-next-line
	}, [testState.getTimer])

	const typingHandler = async(event: KeyboardEvent) => {
		if (testState.getIsStarted) {
			configState.getPlaySound && playSound(event.key)

			const currentWordDivEl = wordsRef.current?.querySelectorAll('div')?.item(currentWordIndex)
			const currentLetterEl = currentWordDivEl?.children[currentLetterIndex]

			currentWordDivEl?.children[currentLetterIndex - 1]?.classList.remove('current', 'current1')
			currentLetterEl?.classList.add('current')
			
			if (event.keyCode >= 32 && currentLetterEl) {
				currentLetterEl?.classList.remove('correct', 'incorrect')
				
				if (event.key === currentLetterEl?.getAttribute('data-key')) {
					statsState.setCorrectChars = statsState.getCorrectChars + 1
					currentLetterEl.classList.add('correct')
				} else {
					statsState.setIncorrectChars = statsState.getIncorrectChars + 1
					currentLetterEl?.classList.add('incorrect')
				}

				statsState.setEnteredChars = statsState.getEnteredChars + 1
				currentLetterIndex++
			} else {
				if (event.key === 'Backspace') {
					statsState.setEnteredChars = statsState.getEnteredChars - 1
					currentLetterEl?.classList.remove('current')
					currentWordDivEl?.children[currentLetterIndex - 2]?.classList.add('current')
					currentLetterIndex && currentLetterIndex--
					const removableLetter = currentWordDivEl?.children.item(currentLetterIndex)
					if (removableLetter?.classList.contains('correct')) {
						statsState.setCorrectChars = statsState.getCorrectChars - 1
					}
					removableLetter?.classList.remove('incorrect', 'correct')
				}
			}
			
			if (currentWordDivEl?.querySelectorAll('.correct').length === currentWordDivEl?.childElementCount) {
				currentLetterEl?.classList.remove('current')
				currentWordIndex++
				testState.setEnteredWords = testState.getEnteredWords + 1
				currentLetterIndex = 0
			}

			if (testState.getEnteredWords === configState.getWordsCount) {
				currentLetterIndex = 0
				currentWordIndex = 0
				testState.stopTest(fetching)
			}

		} else if (event.key === ' ') {
			currentLetterIndex = 0
			currentWordIndex = 0
			testState.startTest()
		}
	}
	
	if (loading) {
		return <Loader />
	}

	if (error) {
		return <span style={{color: 'red', textAlign: 'center'}}>{error}</span>
	}

	return (
		<section className={css.test}>
			<div className='container'>
				{statsState.getResultIsExist 
					? <Stats /> 
					: <>
						<Timer 
							start={testState.getIsStarted}
						/>
						<div className={css.test__inner} id='words' ref={wordsRef}>
							<WordList words={testState.getWords}/>
						</div>

						{testState.getIsStarted
							? <ReloadButton sx={{marginBottom: '30px'}} onClick={() => testState.stopTest(fetching)}/>
							: <ReloadButton sx={{marginBottom: '30px'}} onClick={() => fetching()}/>
						}

						<div className={css.test__hotkey}>
							<p className={testState.getIsStarted ? css.active : ''}>
								press <span className={css.key}>space</span> to start
							</p>
						</div>
					</>
				}
			</div>
		</section>
	)
})

export default TypingTest
