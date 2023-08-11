import axios from 'axios'
import { API_URL } from '../utils/consts'

export class WordsService {
	static async getWords(count: number = 30, length: number = 4) {
		const response = await axios.get(API_URL, {params: {
			words: count,
			length: length
		}})
		return response.data
	}
}