import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { WordsService } from '../../API/WordsService'
import { useQuery } from '../../hooks/useQuery'
import configState from '../../store/configState'
import testState from '../../store/testState'
import { playSound } from '../../utils/playSound'
import Loader from '../UI/Loader/Loader'
import Timer from '../UI/Timer/Timer'
import WordList from '../Words/WordList'
import css from './TypingTest.module.css'

const TypingTest = observer(() => {
	const [words, setWords] = useState<string[]>([])
	const wordsRef = useRef<HTMLDivElement | null>(null)
	const {fetching, loading, error} = useQuery(async () => {
		const responseWords = await WordsService.getWords(configState.getWordsCount, configState.getWordLength)
		setWords(responseWords)
	})
	let currentLetterIndex = 0
	let currentWordIndex = 0
	
	useEffect(() => {
		!testState.getIsStarted && fetching()
		document.addEventListener('keydown', typingHandler)
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		testState.getTimer === configState.getSeconds && testState.stopTest(fetching)
		// eslint-disable-next-line
	}, [testState.getTimer])

	const typingHandler = (event: KeyboardEvent) => {
		if (testState.getIsStarted) {
			configState.getPlaySound && playSound(event.key)

			const currentWordDivEl = wordsRef.current?.querySelectorAll('div')?.item(currentWordIndex)
			const currentLetterEl = currentWordDivEl?.children[currentLetterIndex]

			currentWordDivEl?.children[currentLetterIndex - 1]?.classList.remove('current', 'current1')
			currentLetterEl?.classList.add('current')
			
			if (event.keyCode >= 32 && currentLetterEl) {
				currentLetterEl?.classList.remove('correct', 'uncorrect')
				
				if (event.key === currentLetterEl?.getAttribute('data-key')) {
					currentLetterEl.classList.add('correct')
				} else {
					currentLetterEl?.classList.add('uncorrect')
				}
	
				currentLetterIndex++
			} else {
				if (event.key === 'Backspace') {
					currentLetterEl?.classList.remove('current')
					currentWordDivEl?.children[currentLetterIndex - 2]?.classList.add('current')
					currentLetterIndex && currentLetterIndex--
					const removableLetter = currentWordDivEl?.children.item(currentLetterIndex)
					removableLetter?.classList.remove('uncorrect', 'correct')
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
				
				<Timer 
					start={testState.getIsStarted}
				/>

				<div className={css.test__inner} id='words' ref={wordsRef}>
					<WordList words={words}/>
				</div>

				<div className={css.test__hotkey}>
					<p className={testState.getIsStarted ? css.active : ''}>
						press <span className={css.key}>space</span> to start
					</p>
				</div>
			</div>
		</section>
	)
})

export default TypingTest
