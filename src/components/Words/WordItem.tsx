
interface WordItemProps {
	word: string
	count: number
}

const WordItem = ({word, count} : WordItemProps) => {
  return (
	<>
		{word.split('').map((letter: string, idx: number) => (
			<p className={!count && !idx ? 'current1' : ''} key={idx} data-index={idx} data-key={letter}>{letter}</p>
		))}
	</>
  )
}

export default WordItem
