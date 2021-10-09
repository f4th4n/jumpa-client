import { Socket, Presence } from 'phoenix'
import _ from 'lodash'
import { renderOnlineUsers } from './players/render-player'

const payload = { player_id: 1, room_id: 1 }

let presences = {}

let socket = new Socket('ws://localhost:4000/game', { params: { token: 'abc' } })
socket.connect()

// Now that you are connected, you can join channels with a topic:
const channel = socket.channel('level', payload)

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

// -------------------------------------------------------------------------------- EXPOSE
window.channel = channel
