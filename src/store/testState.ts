import { makeAutoObservable } from 'mobx'
import configState from './configState'

class TestState {
	private _timer = 0
	private _enteredWords = 0
	private _isStarted = false

	constructor() {
		makeAutoObservable(this)
	}

	// getters
	public get getTimer(): number {
		return this._timer
	}

	public get getEnteredWords(): number {
		return this._enteredWords
	}

	public get getIsStarted(): boolean {
		return this._isStarted
	}

	// setters
	public set setEnteredWords(value: number) {
		this._enteredWords = value
	}

	public set setIsStarted(value: boolean) {
		this._isStarted = value
	}

	// methods
	public startTest() {
		this._enteredWords = 0
		this._timer = 0
		this._isStarted = true
		this.startTimer()
	}

	public stopTest(fetchWords: () => void) {
		this._isStarted = false
		fetchWords()
	}

	public startTimer() {
		const timer = setInterval(() => {
			if (this._timer === configState.getSeconds || this._enteredWords === configState.getWordsCount) {
				clearInterval(timer)
			}

			this._timer++
		}, 1000)
	}
}

// eslint-disable-next-line
export default new TestState()