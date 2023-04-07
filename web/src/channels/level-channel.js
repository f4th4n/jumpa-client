import { Presence } from 'phoenix'
import { playerModel } from '../models/player-model'
import { position } from '../game/position'

const levelChannel = {
  channel: null,
  socket: null,
  presences: [],
  state: {
    currentPlayer: null,
  },

  init: (socket) => {
    levelChannel.socket = socket
    levelChannel.subscribe()
  },

  subscribe: () => {
    playerModel.currentPlayer.subscribe({
      next: (currentPlayer) => {
        levelChannel.state.currentPlayer = currentPlayer
        console.log('dddd', currentPlayer)
        levelChannel.create()
      },
    })
  },

  create: () => {
    const currentPlayer = levelChannel.state.currentPlayer
    const payload = { player_token: currentPlayer.token }
    const roomToken = currentPlayer.room.token
    const channel = levelChannel.socket.channel('level:' + roomToken, payload)
    levelChannel.channel = channel

    channel
      .join()
      .receive('ok', (resp) => {
        console.log('Joined successfully', resp)
      })
      .receive('error', (resp) => {
        console.log('Unable to join', resp)
      })

    // TODO resume on last position when reload
    position.walkAbsolute(0, 0)
    levelChannel.addEvent(channel)
  },

  addEvent: (channel) => {
    channel.on('ping', (state) => {
      console.log('there is ping from server', state, +new Date())
    })

    channel.on('walk_absolute', (state) => {
      position.updatePlayerPos(state)
    })

    channel.on('presence_state', (state) => {
      const presences = Presence.syncState(playerModel.presences._value, state)
      playerModel.presences.next(presences)
    })

    channel.on('presence_diff', (diff) => {
      const presences = Presence.syncDiff(playerModel.presences._value, diff)
      console.log('diff', diff)
      console.log('presences', presences)
      playerModel.presences.next(presences)
    })
  },
}

// -------------------------------------------------------------------------------- EXPOSE
export { levelChannel }
