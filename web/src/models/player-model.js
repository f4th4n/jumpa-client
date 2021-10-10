import { BehaviorSubject } from 'rxjs'

const playerModel = {
  currentPlayer: {
    playerId: new BehaviorSubject(-1),
  },
  players: new BehaviorSubject([]),
    /*
		 * players: {
				id: int,
				nick: string,
				position: {
					x: float,
					y: float
				},
				inventories: [
					{
						id: int,
						// TODO
					}
				]
			},
		*/
  presences: new BehaviorSubject([]),
	/*
	 * presences: {
			'player:$int': {
				metas: [
					{
						nick: string,
						phx_ref: string,
						player_id: int,
					},
				],
			},
		},
	*/

	// methods
	setPositions: (eventState) => {
		const players = [...playerModel.players._value]
		const ctxPlayer = players.find(v => v.id == eventState.player_id)
		if(ctxPlayer) {
		}
		
		console.log('ff', ctxPlayer)
	}
}

export { playerModel }
