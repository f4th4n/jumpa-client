import { playerModel } from '../models/player-model'

const renderPlayer = {
  start: () => {
    renderPlayer.subscribe()
  },

  subscribe: () => {
    playerModel.presences.subscribe({
      next: (v) => renderPlayer.render(),
    })
    playerModel.players.subscribe({
      next: (v) => renderPlayer.render(),
    })
  },

  render: () => {
    var html = ''
    for (let key in playerModel.presences._value) {
      const presence = playerModel.presences._value[key]
      const player_id = presence.metas[0].player_id
      const player = playerModel.players._value[player_id]

      html += `<li>
        nick: ${player_id}<br />
        ${player ? `position: x ${player.pos_x}, y ${player.pos_x}}` : ''}
        <br /><br />
      </li>`
    }
    window.document.querySelector('#player-list').innerHTML = html
  },
}

export { renderPlayer }
