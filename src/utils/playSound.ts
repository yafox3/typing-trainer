import configState from '../store/configState'

const initSound = (key: string) => {
    const sound = require(`../assets/sounds/nk-cream/${key}.wav`)
    const audio = new Audio(sound)
    audio.volume = configState.getVolume
    return audio
}

export const playSound = (key: string) => {
    try {
        const audio = initSound(key)
	    audio.play()
    } catch {
        const audio = initSound('space')
	    audio.play()
    }
}
