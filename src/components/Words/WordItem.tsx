
interface WordItemProps {
	word: string
}

const WordItem = ({word} : WordItemProps) => {
  return (
	<>
		{word.split('').map((letter: string, idx: number) => (
			<p key={idx} data-index={idx} data-key={letter}>{letter}</p>
		))}
	</>
  )
}

export default WordItem
