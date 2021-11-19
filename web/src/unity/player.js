import { caller } from './caller'

const player = {
	changeName: (name) => {
		caller.call('Player', 'ChangeName', name)
	},
	changePos: (x, y) => {
		caller.call('Player', 'ChangePos', x, y)
	}
}

export { player }
