import { playerModel } from './models/player-model'
import { request } from './request/request'
import { plainWeb } from './plain-web'
import { unity } from './unity'

const initializeState = {
  waitForUnity: () => {
    if (!window.isInsideUnity) return Promise.resolve()

    return new Promise((resolve, reject) => {
      const pointer = setInterval(() => {
        if (window.unityInstance) {
          clearInterval(pointer)
          resolve()
          return
        }
      }, 50)
    })
  },
  setState: async () => {
    const setPlayer = async () => {
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
    }
    await setPlayer()
  },
  renderState: async () => {
    if (window.isInsideUnity) {
			const currentPlayer = playerModel.currentPlayer._value
      unity.player.updateProfile(currentPlayer)
			unity.player.updatePos(currentPlayer.pos_x, currentPlayer.pos_y)
    } else {
      plainWeb.renderPlayer.start()
    }
  },
}

export { initializeState }
