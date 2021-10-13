import { playerModel } from './models/player-model'

const init = {
  setState: async () => {
    await init.setPlayer()
  },
  setPlayer: async () => {
    const playerId = init.getPlayerIdFromQueryParam()
    console.log('playerId', playerId)
  },
  getPlayerIdFromQueryParam: () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    if (!params.player_token) {
      throw new Error('Unknown player id')
    }

    const playerToken = params.player_token
    //playerModel.currentPlayer.next({ ...playerModel.currentPlayer._value, playerToken })

    return playerToken
  },
}

export { init }
