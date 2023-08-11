import { useEffect, useRef, useState } from 'react'
import { WordsService } from '../../API/WordsService'
import { useQuery } from '../../hooks/useQuery'
import Loader from '../UI/Loader/Loader'
import css from './TypingTest.module.css'

const TypingTest = () => {
	const [words, setWords] = useState<string[]>([])
	const wordsRef = useRef<HTMLDivElement | null>(null)
	const [start, setStart] = useState(false)
	const {fetching, loading, error} = useQuery(async () => {
		const responseWords = await WordsService.getWords(30, 4)
		setWords(responseWords)
	})
	let isStarted = false
	let currentLetterIndex = 0
	let currentWordIndex = 0

	useEffect(() => {
		fetching()
	}, [])

	useEffect(() => {
		words.length && document.addEventListener('keydown', typingHandler)
	}, [words])
	
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
				currentLetterIndex = 0
			}
		} else if (event.key === ' ') {
			isStarted = true
			setStart(true)
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
				<div className={css.test__inner} id='words' ref={wordsRef}>
					{words.map((word, idx) => (
						<div style={{ display: 'flex' }} key={idx} data-index={idx}>
							{word.split('').map((letter, idx) => (
								<p key={idx} data-index={idx} data-key={letter}>{letter}</p>
							))}
						</div>
					))}
				</div>

				{!start && <div className={css.test__hotkey}>
					<p>press <span className={css.key}>space</span> to start</p>
				</div>}
			</div>
		</section>
	)
}

export default TypingTest
