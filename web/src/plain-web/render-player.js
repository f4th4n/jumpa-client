import { playerModel } from '../models/player-model'

const renderPlayer = {
  start: () => {
    renderPlayer.subscribe()
  },

  subscribe: () => {
    playerModel.presences.subscribe({
      next: (v) => renderPlayer.render(v),
    })
  },

  render: (presences) => {
    var html = ''
    for (let k in presences) {
      console.log('playerModel', playerModel.players._value)
      html += `<li>
        nick: ${presences[k].metas[0].nick}<br />
        position: x 30, y 40
        <br /><br />
      </li>`
    }
    window.document.querySelector('#player-list').innerHTML = html
  },
}

export { renderPlayer }
