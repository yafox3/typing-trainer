export const playSound = (key: string) => {
    try {
        const sound = require(`../assets/sounds/nk-cream/${key}.wav`)
	    const audio = new Audio(sound)
	    audio.play()
    } catch (error) {
        const sound = require(`../assets/sounds/nk-cream/space.wav`)
	    const audio = new Audio(sound)
        audio.play()
    }
}
