const renderOnlineUsers = (presences) => {
	var html = ''
	for(let k in presences) {
		html += `<li>${presences[k].metas[0].nick}</li>`
	}
	window.document.querySelector('#player-list').innerHTML = html
}

export { renderOnlineUsers }
