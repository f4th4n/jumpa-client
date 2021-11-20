import { caller } from './caller'
import { playerModel } from '../models/player-model'

class PlayerProfile {
	id = null
	name = ''
	color = [0, 0, 0]
	posX = 0
	posY = 0

	constructor(id, name, color, posX, posY) {
		this.id = id
		this.name = name
		this.color = color
		this.posX = posX
		this.posY = posY
	}
}

const player = {
	currentPlayer: null,
	spawnedPlayerProfile: [],

	start: (currentPlayerArg) => {
		player.currentPlayer = currentPlayerArg
		player.updateProfile(currentPlayerArg)
		player.updatePos(currentPlayerArg.pos_x, currentPlayerArg.pos_y)
		player.subscribe()
	},
	subscribe: () => {
		playerModel.presences.subscribe({
			next: (v) => player.render(v),
		})
	},
	render: (presences) => {
		if (!player.currentPlayer) return

		const playerMinusSelf = Object.values(presences)
			.filter((p) => p.metas.filter((meta) => meta.player_id !== player.currentPlayer.id).length)
			.map((v) => v.metas[0])

		const spawnPlayer = () => {
			var res = []
			for (let presence of playerMinusSelf) {
				const profile = new PlayerProfile(presence.player_id, presence.nick, [1, 1, 1], 0, 0)
				res.push(profile)
				player.spawn(profile)
			}

			return res
		}

		const destroyPlayerGO = (spawnedPlayerProfile) => {
			const spawnedPlayerProfileIds = spawnedPlayerProfile.map((v) => v.id)
			const playerIdsFromPresence = playerMinusSelf.map((v) => v.player_id)
			for (let spawnedId of spawnedPlayerProfileIds) {
				if (!playerIdsFromPresence.includes(spawnedId)) {
					player.destroy(spawnedId)
				}
			}
		}

		// add player if they are present
		const spawnedPlayerProfile = spawnPlayer()
		if (spawnedPlayerProfile.length) {
			player.spawnedPlayerProfile.push(...spawnedPlayerProfile)
		}

		// remove player if they're not presence
		destroyPlayerGO(player.spawnedPlayerProfile)
	},
	updateProfile: (player) => {
		const profile = {
			id: player.id,
			name: player.nick,
			color: [1.0, 0, 0], // TODO implement color system
		}
		caller.call('Player', 'BridgeUpdateProfile', JSON.stringify(profile))
	},
	updatePos: (x, y) => {
		console.log('player changed pos', x, y)
		caller.call('Player', 'BridgeUpdatePos', JSON.stringify({ x, y }))
	},
	spawn: (profile) => {
		caller.call('PlayerSpawner', 'BridgeSpawn', JSON.stringify(profile))
	},
	destroy: (playerId) => {
		console.log('destroy', playerId)
		caller.call('PlayerSpawner', 'BridgeDestroy', playerId)
	},
}

export { player }
