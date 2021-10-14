import { playerModel } from './models/player-model'
import { request } from './request/request'

const initializeState = {
  setState: async () => {
    await initializeState.setPlayer()
  },
  setPlayer: async () => {
    const getPlayerTokenFromQueryParam = () => {
      const urlSearchParams = new URLSearchParams(window.location.search)
      const params = Object.fromEntries(urlSearchParams.entries())
      if (!params.player_token) {
        throw new Error('Unknown player id')
      }

      const playerToken = params.player_token

      return playerToken
    }

    const playerToken = getPlayerTokenFromQueryParam()
    const resPlayer = await request.get(`/players/get-by-token/${playerToken}`)
    const player = resPlayer.data
    if (!player) throw new Error('Player not found')

		playerModel.currentPlayer.next(player)
  },
}

export { initializeState }
