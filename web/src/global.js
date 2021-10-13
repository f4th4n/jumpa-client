import { game } from './game/index'
import { levelChannel } from './channels/level-channel'
import { playerModel } from './models/player-model'
import { request } from './request/request'

const global = {
	start: () => {
		window.ff = {
			game,
			channels: {
				levelChannel
			},
			models: {
				playerModel
			},
			request
		}
	}
}

export { global }
