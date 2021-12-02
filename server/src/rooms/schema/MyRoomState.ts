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

  constructor(time: number = 0){
    super()
    this.gameTime = time
  }
}
