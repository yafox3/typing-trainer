import { Route, Routes } from 'react-router-dom'
import { router } from '../router/router'

const AppRouter = () => {
	return (
		<Routes>
			{router.map(route => (
				<Route
					path={route.path}
					element={route.element}
					key={route.path}
				/>
			))}
		</Routes>
	)
}

export default AppRouter
