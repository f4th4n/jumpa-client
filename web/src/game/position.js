import { caller } from '../unity/caller'
import { levelChannel } from '../channels/level-channel'
import { playerModel } from '../models/player-model'
import { PlayerProfile } from '../models/player-profile-class'

const position = {
  walkAbsolute: (x, y) => {
    const playerToken = playerModel.currentPlayer._value.token
    const state = { player_token: playerToken, created_at: +new Date(), pos_x: x, pos_y: y }

    // self
    position.updatePlayerPos(
      {
        created_at: state.created_at,
        id: playerModel.currentPlayer._value.id,
        pos_x: x,
        pos_y: y,
      },
      true
    )

    // other
    levelChannel.channel.push('walk_absolute', state)
  },

  updatePlayerPos: (state, isSelf = false) => {
    var players = { ...playerModel.players._value }
    console.log('...players', players)
    console.log('...state', state)
    players[state.player_id] = { ...state }
    console.log('....players', players)
    playerModel.players.next(players)

    var profile = new PlayerProfile()
    profile.id = state.id
    profile.posX = state.pos_x
    profile.posY = state.pos_y
    caller.call('Player', 'BridgeUpdatePos', JSON.stringify(profile))
  },
}

export { position }
