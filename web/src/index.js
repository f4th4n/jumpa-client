import { init } from './init'
import { socket } from './channels/index'
import { renderPlayer } from './players/render-player'

const error = init.setState()
if(error) {
	alert(error)
}

renderPlayer.start()
socket.start()

