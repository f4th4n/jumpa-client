import { init } from './init'
import { socket } from './channels/index'
import { renderPlayer } from './players/render-player'
import { global } from './global'

init
  .setState()
  .then(() => {
    renderPlayer.start()
    socket.start()
    global.start()
  })
  .catch((e) => {
    console.log('e', e)
    alert(e)
  })
