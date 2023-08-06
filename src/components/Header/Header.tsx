import { Link } from 'react-router-dom'
import { AppRoutes } from '../../router/router'
import css from './Header.module.css'

const Header = () => {
	return (
		<header className={css.header}>
			<div className='container'>
				<div className={css.header__inner}>
					<i className="bi bi-keyboard"></i>
					<Link
						to={AppRoutes.MAIN}
						className={css.logo}>
						yieldmetype
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
