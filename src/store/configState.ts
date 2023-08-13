import { makeAutoObservable } from 'mobx'

class ConfigState {
	private _wordsCount = 20
	private _seconds = 30
	private _playSound = true
	private _volume = 0.5
	private _wordsLength = 6

	constructor() {
		makeAutoObservable(this)
	}

	public get getWordsCount(): number {
		return this._wordsCount
	}
 
	public get getSeconds(): number {
		return this._seconds
	}
 
	public get getPlaySound(): boolean {
		return this._playSound
	}
 
	public get getVolume(): number {
		return this._volume
	}

	public get getWordLength(): number {
		return this._wordsLength
	}
	


	public set setWordsCount(value: number) {
		this._wordsCount = value
	}

	public set setSeconds(value: number) {
		this._seconds = value
	}
	
	public set setPlaySound(value: boolean) {
		this._playSound = value
	}
	
	public set setVolume(value: number) {
		this._volume = value
	}

	public set setWordLength(value: number) {
		this._wordsLength = value
	}
}

// eslint-disable-next-line
export default new ConfigState()