import { playerModel } from './models/player-model'

const init = {
  setState: () => {
    init.setPlayerIdFromQueryParam()
  },
  setPlayerIdFromQueryParam: () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    if (!params.player_token) {
      return 'Unknown player id'
    }

    onst playerToken = params.player_token
    playerModel.currentPlayer.next({ ...playerModel.currentPlayer._value, playerToken })

    return null
  },
}

export { init }
