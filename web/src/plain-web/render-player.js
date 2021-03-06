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
      html += `<li>${presences[k].metas[0].nick}</li>`
    }
    window.document.querySelector('#player-list').innerHTML = html
  },
}

export { renderPlayer }
