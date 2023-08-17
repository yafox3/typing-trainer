import { makeAutoObservable } from 'mobx'
import statsState from './statsState'

class TestState {
	private _words: string[] = []
	private _timer = 0
	private _enteredWords = 0
	private _isStarted = false
	private _timeFunc: any;
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
	
	public get getWords() : string[] {
		return this._words
	}

	// setters
	public set setEnteredWords(value: number) {
		this._enteredWords = value
	}

	public set setIsStarted(value: boolean) {
		this._isStarted = value
	}
	
	public set setWords(v : string[]) {
		this._words = v;
	}
	
	public set setTimer(v : number) {
		this._timer = v;
	}

	// methods
	public startTest() {
		this.resetScore()
		this._isStarted = true
		this.startTimer()
	}

	public stopTest(fetchWords: () => void) {
		statsState.setResultIsExist = !!statsState.getEnteredChars
		this.stopTimer()
		this._isStarted = false
		statsState.calcWpm(this.getEnteredWords, this.getTimer)
		statsState.calcAcc()
		fetchWords()
	}

	public resetScore() {
		this.setEnteredWords = 0
		this.setTimer = 0
		statsState.setEnteredChars = 0
		statsState.setCorrectChars = 0
		statsState.setIncorrectChars = 0
		statsState.setResultIsExist = false
	}

	public startTimer() {
		this._timeFunc = setInterval(() => {
			this.setTimer = this.getTimer + 1
		}, 1000)
	}

	public stopTimer() {
		clearInterval(this._timeFunc)
	}
}

// eslint-disable-next-line
export default new TestState()