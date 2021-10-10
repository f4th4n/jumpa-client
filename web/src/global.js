import { game } from './game/index'

const global = {
	start: () => {
		window.ff = {
			game
		}
	}
}

export { global }
