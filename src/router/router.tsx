import Main from '../pages/Main/Main'

export enum AppRoutes {
	MAIN = '/',
}

export const router = [
	{
		path: AppRoutes.MAIN,
		element: <Main />
	},
	{
		path: '*',
		element: <Main />
	},
]