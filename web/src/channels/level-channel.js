import { Presence } from 'phoenix'
import { playerModel } from '../models/player-model'
import { game } from '../game/index'

const levelChannel = {
  channel: null,
	socket: null,
	presences: [],

  init: (socket) => {
		levelChannel.socket = socket
		levelChannel.subscribe()
  },

	subscribe: () => {
    playerModel.currentPlayer.playerId.subscribe({
      next: (playerId) => levelChannel.create(playerId),
    })
		
    playerModel.presences.subscribe({
      next: (v) => levelChannel.presences = v,
    })
	},

  create: (playerId) => {
		const payload = { player_id: playerId }
    const channel = levelChannel.socket.channel('level', payload)
    levelChannel.channel = channel

    channel
      .join()
      .receive('ok', (resp) => {
        console.log('Joined successfully', resp)
      })
      .receive('error', (resp) => {
        console.log('Unable to join', resp)
      })

		levelChannel.addEvent(channel)
  },

	addEvent: (channel) => {
    channel.on('ping', (state) => {
      console.log('there is ping from server', state, +new Date())
    })

    channel.on('walk_absolute', (state) => {
			//game.position.updatePos(state)
			playerModel.setPositions(state)
			console.log('state', state)
    })

    channel.on('presence_state', (state) => {
      const presences = Presence.syncState(levelChannel.presences, state)
			playerModel.presences.next(presences)
    })

    channel.on('presence_diff', (diff) => {
      const presences = Presence.syncDiff(levelChannel.presences, diff)
			playerModel.presences.next(presences)
    })
	}
}

// -------------------------------------------------------------------------------- EXPOSE
export { levelChannel }
