import { playerModel } from './models/player-model'

const init = {
  setState: () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    if (!params.player_id) {
      return 'Unknown player id'
    }

		const playerId = parseInt(params.player_id)
		playerModel.currentPlayer.playerId.next(playerId)

    return null
  },
}

export { init }
