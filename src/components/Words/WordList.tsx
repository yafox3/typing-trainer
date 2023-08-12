import WordItem from './WordItem'

interface WordListProps {
	words: string[]
}

const WordList = ({ words }: WordListProps) => {
  return (
	<>
		{words.map((word: string, idx: number) => (
			<div style={{ display: 'flex' }} key={idx} data-index={idx}>
				<WordItem word={word}/>
			</div>
		))}
	</>
  )
}

export default WordList
