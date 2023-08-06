import AppRouter from './components/AppRouter'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import './styles/App.css'

const App = () => {
	return (
		<div className='wrapper'>
			<Header />
			<AppRouter />
			<Footer />
		</div>
	)
}

export default App
