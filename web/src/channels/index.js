import config from '../config.json'
import { Socket } from 'phoenix'
import { levelChannel } from './level-channel'

const channelModule = {
	start: () => {
		const socket = new Socket(config.wsGameEndpoint, { params: { token: 'abc' } }) // TODO change token
		socket.connect()

		levelChannel.create(socket)
		
		return socket;
	}
}

// -------------------------------------------------------------------------------- EXPOSE
const socket = channelModule
export { socket }
