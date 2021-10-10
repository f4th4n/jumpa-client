import { init } from './init'
import { socket } from './channels/index'
import { renderPlayer } from './players/render-player'
import { global } from './global'

const error = init.setState()
if(error) {
	alert(error)
}

renderPlayer.start()
socket.start()
global.start()

