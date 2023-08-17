import { observer } from 'mobx-react-lite'
import Toolbar from '../../components/Toolbar/Toolbar'
import TypingTest from '../../components/TypingTest/TypingTest'
import './Main.css'

const Main = observer(() => {
	return (
		<main className='main'>
			<Toolbar />
			<TypingTest />
		</main>
	)
})

export default Main
