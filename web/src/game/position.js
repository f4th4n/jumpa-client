import { levelChannel } from '../channels/level-channel'

const position = {
  updatePos: (state) => {
		// state = { player_id: 1, created_at: +new Date(), x: 10.21, y: 4.203 }
    levelChannel.channel.push('walk_absolute', state)
  },
}

export { position }
