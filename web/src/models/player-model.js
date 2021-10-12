import { BehaviorSubject } from 'rxjs'

const playerModel = {
  currentPlayer: new BehaviorSubject({
    playerToken: '',
		name: '-',
  }),
  players: new BehaviorSubject([]),
    /*
		 * players: {
				id: int,
				nick: string,
				pos_x: float,
				pos_y: float,
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
						id: int,
						token: string,
					},
				],
			},
		},
	*/

	// methods
	setPositions: (eventState) => {
		const players = [...playerModel.players._value]
		const ctxPlayer = players.find(v => v.id == eventState.player_token)
		if(ctxPlayer) {
		}
		
		console.log('ff', ctxPlayer)
	}
}

export { playerModel }
