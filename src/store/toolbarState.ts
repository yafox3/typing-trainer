import { makeAutoObservable } from 'mobx'
import configState from './configState'


export class ToolbarState {
	private _category = 'words'
	private _option = 30

	constructor() {
		makeAutoObservable(this)
	}

	// getters
	public get getCategory() : string {
		return this._category
	}

	public get getOption() : number {
		return this._option
	}

	// setters
	public set setCategory(v : string) {
		this._category = v;
	}
	
	public set setOption(v : number) {
		this._option = v;

		switch (this._category) {
			case 'words':
				configState.setWordsCount = this._option
				break
			case 'time': 
				configState.setSeconds = this._option
				break
		}
	}
	
}

// eslint-disable-next-line
export default new ToolbarState()