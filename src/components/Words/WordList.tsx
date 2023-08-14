import configState from '../../store/configState'
import WordItem from './WordItem'

interface WordListProps {
	words: string[]
}

const WordList = ({ words }: WordListProps) => {
  return (
	<>
		{words.map((word: string, idx: number) => (
			<div style={{ display: 'flex' }} key={idx} data-index={idx}>
				<WordItem count={idx} word={word}/>
				{idx < words.length - 1 && <p data-key=' '>{' '}</p>}
			</div>
		))}
	</>
  )
}

export default WordList
