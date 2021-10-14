import { initializeState } from './initialize-state'
import { socket } from './channels/index'
import { renderPlayer } from './players/render-player'
import { global } from './global'

initializeState
  .setState()
  .then(() => {
    renderPlayer.start()
    socket.start()
    global.start()
  })
  .catch((e) => {
    console.log('e', e)
		//alert(e)
  })
