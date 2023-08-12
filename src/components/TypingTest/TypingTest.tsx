import { useEffect, useRef, useState } from 'react'
import { WordsService } from '../../API/WordsService'
import { useQuery } from '../../hooks/useQuery'
import Loader from '../UI/Loader/Loader'
import Timer from '../UI/Timer/Timer'
import css from './TypingTest.module.css'
import WordList from '../Words/WordList'

const TypingTest = () => {
	const [words, setWords] = useState<string[]>([])
	const wordsRef = useRef<HTMLDivElement | null>(null)
	const [start, setStart] = useState(false)
	const [seconds, setSeconds] = useState(0)
	const {fetching, loading, error} = useQuery(async () => {
		const responseWords = await WordsService.getWords(30, 4)
		setWords(responseWords)
	})
	let isStarted = false
	let enteredWords = 0
	let currentLetterIndex = 0
	let currentWordIndex = 0

	useEffect(() => {
		!start && fetching()
	}, [])

	useEffect(() => {
		words.length && document.addEventListener('keydown', typingHandler)
	}, [words])

	useEffect(() => {
		seconds === 30 && stopGame() 
	}, [seconds])
	
	const startGame = () => {
		isStarted = true
		setStart(true)
	}

	const stopGame = () => {
		isStarted = false
		setStart(false)
		setSeconds(0)
	}

	const typingHandler = (event: KeyboardEvent) => {
		if (isStarted) {
			const currentWordDivEl = wordsRef.current?.querySelectorAll('div')?.item(currentWordIndex)
			const currentLetterEl = currentWordDivEl?.children[currentLetterIndex]
	
			currentWordDivEl?.children[currentLetterIndex - 1]?.classList.remove('current')
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
				enteredWords++
				currentLetterIndex = 0
			}

			if (enteredWords === wordsRef.current?.childElementCount) {
				stopGame()
			}

		} else if (event.key === ' ') {
			startGame()
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
					seconds={seconds} 
					setSeconds={() => setSeconds(prev => prev + 1)} 
					start={start}
				/>

				<div className={css.test__inner} id='words' ref={wordsRef}>
					<WordList words={words}/>
				</div>

				<div className={css.test__hotkey}>
					<p className={start ? css.active : ''}>
						press <span className={css.key}>space</span> to start
					</p>
				</div>
			</div>
		</section>
	)
}

export default TypingTest
