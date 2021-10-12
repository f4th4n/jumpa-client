import { Presence } from 'phoenix'
import { playerModel } from '../models/player-model'

const levelChannel = {
  channel: null,
  socket: null,
  presences: [],

  init: (socket) => {
    levelChannel.socket = socket
    levelChannel.subscribe()
  },

  subscribe: () => {
    playerModel.currentPlayer.subscribe({
      next: (currentPlayer) => levelChannel.create(currentPlayer.playerToken),
    })
  },

  create: (playerToken) => {
    const payload = { player_token: playerToken }
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

    levelChannel.getPlayers(channel)
    levelChannel.addEvent(channel)
  },

  getPlayers: (channel) => {
    channel
      .push('get_players', { player_token: 1 })
      .receive('ok', (reply) => playerModel.players.next([...reply.data]))
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
      const presences = Presence.syncState(playerModel.presences._value, state)
      playerModel.presences.next(presences)
    })

    channel.on('presence_diff', (diff) => {
      const presences = Presence.syncDiff(playerModel.presences._value, diff)
      playerModel.presences.next(presences)
    })
  },
}

// -------------------------------------------------------------------------------- EXPOSE
export { levelChannel }
