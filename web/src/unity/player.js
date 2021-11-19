import { caller } from './caller'

const player = {
	updateProfile: (player) => {
		caller.call('Player', 'BridgeUpdateProfile', {
			id: player.id,
			name: player.nick,
			color: [1.0, 0, 0] // TODO implement color system
		})
	},
	updatePos: (x, y) => {
		console.log('player changed pos', x, y)
		caller.call('Player', 'BridgeUpdatePos', JSON.stringify({x, y}))
	}
}

export { player }
