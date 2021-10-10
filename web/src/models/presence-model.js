var data = {
  presences: [
    /*
		{
			"player:$int": {
				"metas": [
					{
						"nick": string,
						"phx_ref": string,
						"player_id": int
					}
				]
			}
		}
		*/
  ],
}

setInterval(() => {
	console.log('data.presences', data.presences)
}, 1000)

const presenceModel = {
	data
}

export { presenceModel }
