import { makeAutoObservable } from 'mobx'

class StatsState {
	private _wpm = 0
	private _acc = 0
	private _correctChars = 0
	private _incorrectChars = 0
	private _enteredChars = 0
	private _resultIsExist = false

	constructor() {
		makeAutoObservable(this)
	}

	// getters
	public get getWpm() : number {
		return this._wpm
	}
	public get getAcc() : number {
		return this._acc
	}

	public get getCorrectChars() : number {
		return this._correctChars
	}

	public get getIncorrectChars() : number {
		return this._incorrectChars
	}

	public get getResultIsExist() : boolean {
		return this._resultIsExist
	}

	public get getEnteredChars() {
		return this._enteredChars
	}
	
	// setters
	public set setWpm(v : number) {
		this._wpm = v;
	}
	
	public set setAcc(v : number) {
		this._acc = v;
	}
	
	public set setCorrectChars(v : number) {
		this._correctChars = v;
	}

	public set setIncorrectChars(v : number) {
		this._incorrectChars = v;
	}

	public set setResultIsExist(v : boolean) {
		this._resultIsExist = v;
	}

	public set setEnteredChars(v : number) {
		this._enteredChars = v;
	}
	
	// methods
	public calcWpm (enteredWords: number, seconds: number): number {
		this.setWpm = enteredWords > 0 ? Math.floor((enteredWords / (seconds / 60)) / 1) : 0
		return this.getWpm
	}

	public calcAcc (): number {
		this.setAcc = (this.getCorrectChars / (this.getIncorrectChars + this.getCorrectChars)) * 100
		return this.getAcc
	}
}

// eslint-disable-next-line
export default new StatsState()