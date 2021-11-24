import { Room, Client } from 'colyseus'
import { cubeColor, MyRoomState, Player } from './schema/MyRoomState'

export class MyRoom extends Room<MyRoomState> {
  onCreate(options: any) {
    this.setState(new MyRoomState())
  

    this.onMessage('pickColor', (client, message) => {
      const player = this.state.players.get(client.sessionId)      
      player.teamColor = message.teamColor
      this.broadcast("flashColor", {id:player.id, teamColor: message.teamColor})      
      console.log(player.name, ' picked color ', message.color)
    })
  
    this.onMessage('throwBall', (client, message) => {
      const player = this.state.players.get(client.sessionId)            
      this.broadcast("throwBall", {pos:message.pos, dir: message.dir, force: message.force, teamColor:player.teamColor, id:player.id },{except: client})      
      console.log(player.name, ' threw a snowball ', message.pos, message.dir, message.force)
    })


    // this.onMessage('setColor', (client, message) => {
    //   const player = this.state.players.get(client.sessionId) 
    //   this.state.cubes.forEach((cube)=>{
    //     if(cube.id == message.id){
    //       cube.color = player.teamColor
    //     }
    //   })
    //   console.log(player.name, ' changed ', message.id, " to ", player.teamColor)
    // })

    this.onMessage('playerPos', (client, message) => {
      const player = this.state.players.get(client.sessionId)

     // if(player.id === message.id){
        this.broadcast("updatePos", {id:message.id, pos:message.pos, rot:message.rot },{except: client})
      
       // console.log(player.name, ' posUpdated ', message.id, message.pos.x)
     // }
            
      
    })

  }

  onJoin(client: Client, options: any) {
 
    const newPlayer = new Player(
      client.id,
      options.userData.displayName || 'Anonymous'
    )
    this.state.players.set(client.sessionId, newPlayer)
    console.log(newPlayer.name, 'joined! => ', options.userData)
    client.send("updateID", {id:client.id} )
    this.broadcast("newPlayerJoined", {id:client.id, color:newPlayer.teamColor}, {except:client})

    //send all current players to the new player
    this.state.players.forEach( (player)=>{
      client.send("newPlayerJoined", {id:player.id})
    })
      
    
  }

  onLeave(client: Client, consented: boolean) {
    const player = this.state.players.get(client.sessionId)
    console.log(player.name, 'left!')
    this.broadcast("playerLeft", {id:client.id }, {except:client})
    this.state.players.delete(client.sessionId)
  }

  onDispose() {
    console.log('Disposing room...')
  }
}
