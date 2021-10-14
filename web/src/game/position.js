import { levelChannel } from '../channels/level-channel'
import { playerModel } from '../models/player-model'

const position = {
  walkAbsolute: (x, y) => {
    const playerToken = playerModel.currentPlayer._value.token
    console.log('playerToken', playerToken)
    const state = { player_token: playerToken, created_at: +new Date(), pos_x: x, pos_y: y }
    levelChannel.channel.push('walk_absolute', state)
  },

  updateOtherPlayerPos: (state) => {
    var players = { ...playerModel.players._value }
    players[state.id] = players[state.id] || { ...state }
    playerModel.players.next({ ...players })
  },
}

export { position }
