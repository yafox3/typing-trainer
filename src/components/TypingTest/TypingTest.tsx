import css from './TypingTest.module.css'

const TypingTest = () => {
	return (
		<section className={css.test}>
			<div className='container'>
				<div className={css.test__inner}>
					word word word word word word word word word word word 
				</div>
			</div>
		</section>
	)
}

export default TypingTest
