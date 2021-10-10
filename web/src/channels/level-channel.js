import { renderOnlineUsers } from '../players/render-player'
import { Presence } from 'phoenix'

const payload = { player_id: 1, room_id: 1 }

const levelChannel = {
	channel: null,

	create: (socket) => {
		const channel = socket.channel('level', payload)
		levelChannel.channel = channel

		let presences = {}

		channel
			.join()
			.receive('ok', (resp) => {
				console.log('Joined successfully', resp)
			})
			.receive('error', (resp) => {
				console.log('Unable to join', resp)
			})

		channel.on('ping', (state) => {
			console.log('there is ping from server', state, +new Date())
		})

		channel.on('walk', (state) => {
			console.log('server is walk', state, +new Date())
		})

		channel.on('presence_state', (state) => {
			presences = Presence.syncState(presences, state)
			renderOnlineUsers(presences)
		})

		channel.on('presence_diff', (diff) => {
			presences = Presence.syncDiff(presences, diff)
			renderOnlineUsers(presences)
		})
	}
}

// -------------------------------------------------------------------------------- EXPOSE
export { levelChannel }
