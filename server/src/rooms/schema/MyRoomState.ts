import { Schema, Context, type, MapSchema, ArraySchema } from '@colyseus/schema'

export enum cubeColor {
  NEUTRAL,
  BLUE,
  RED
}

export enum teamColor {
  BLUE,
  RED
}

export class Player extends Schema {
  @type('string') id: string
  @type('string') name: string  
  @type('string') wallet: string  
  @type('number') teamColor: teamColor
  @type('number') score: number

  constructor(id: string, name: string, wallet: string) {
    super()
    this.id = id
    this.name = name    
    this.teamColor = teamColor.BLUE
    this.wallet = wallet
    this.score = 0
    
  }
}

export class MyRoomState extends Schema {
  //@type([Cube ]) cubes = new ArraySchema<Cube>()
  @type({ map: Player }) players = new MapSchema<Player>()
  @type('number') gameTime: number
  @type('number') blueScore: number = 0
  @type('number') redScore: number = 0
  @type('boolean') inMatch: boolean = true
  @type('string') startTime: string = "0"
  @type('string') server: string = "preview"
  @type('string') island: string = "preview"

  constructor(time: number = 0){
    super()
    this.gameTime = time
  }

  resetScores(){
    this.redScore = 0
    this.blueScore = 0

    this.players.forEach((player) => {
      player.score = 0
    })
  }
}
