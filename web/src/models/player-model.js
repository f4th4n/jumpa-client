import { BehaviorSubject } from 'rxjs'

const playerModel = {
  currentPlayer: {
    playerId: new BehaviorSubject(-1),
  },
  players: [
    /*
		{
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
  ],
  presences: new BehaviorSubject([])
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
}

export { playerModel }
