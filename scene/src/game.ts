import { getCurrentRealm } from '@decentraland/EnvironmentAPI'
import { Cone, cubeColor } from './cones'
import { teamColor } from './modules/teamColors'
import { connect } from './connection'
import { BallManager } from './modules/ball'
import { player, Player } from './modules/player'
import { EnemyManager } from './modules/enemyManager'
import * as ui from './modules/ui'


connect('my_room').then((room)=>{

  player.addBallManager(new BallManager(100, room))
  player.setRoom(room)
  player.addEnemyManager(new EnemyManager())

 
  // REMOVE: add cones
  let blueCone = new Cone(
    {position: new Vector3(6, 1, 14)},
    teamColor.BLUE,
    room
  )

  let redCone = new Cone(
    {position: new Vector3(10, 1, 14)},
    teamColor.RED,
    room
  )

  room.onMessage("flashColor", (data)=>{

    switch(data.teamColor){
      case teamColor.BLUE:{
        log("SERVER BLUE")
        blueCone.activate()
        player.enemyManager.getEnemyByID(data.id).setColor(teamColor.BLUE)

        break
      }
      case 1:{
        log("SERVER RED")
        redCone.activate()
        player.enemyManager.getEnemyByID(data.id).setColor(teamColor.RED)
      }
    }    

  })

  room.onMessage("throwBall", (data)=>{    
    //log("serverPos: " + data.pos.x + ",  " + data.pos.y + ", " + data.pos.z )
    //log("serverDir: " + data.dir.x + ",  " + data.dir.y + ", " + data.dir.z )
   // log("serverFor: " + data.force)
   player.enemyManager.getEnemyByID(data.id).clipThrow.play(true)
   log('SERVER: BALLTHROW : ' + data.teamColor)
   let color = (data.teamColor == 0)?teamColor.BLUE:teamColor.RED
    player.ballManager.spawnBall(color, false).throwBallOther(
      new Vector3(data.pos.x, data.pos.y, data.pos.z), 
      new Vector3(data.dir.x, data.dir.y, data.dir.z),
      data.force      
      )
  })

  //OTHER PLAYER JOINS THE SERVER ROOM
  room.onMessage("newPlayerJoined", (data)=>{    
    log("new player JOINED: " + data.id, + ": " + data.color )
    
    player.enemyManager.addEnemy(data.id, teamColor.BLUE)
    
  })

  //OTHER PLAYER LEAVES THE SERVER ROOM
  room.onMessage("playerLeft", (data)=>{    
    log("player left the game: " + data.id )
    
    player.enemyManager.removeEnemy(data.id)
    
  })

  // PLAYER GETS THEIR OWN ID
  room.onMessage("updateID", (data)=>{    
    log("Your ID is: " + data.id )
    
    player.id = data.id

  })

  // OTHER PLAYER POSITION GETS UPDATED
  room.onMessage("updatePos", (data)=>{    
   // log("Updating enemy POS: " + data.id  + ", " + data.pos.x + ", " + data.pos.y + ", " + data.pos.z)
    
    player.enemyManager.updatePlayerPos(data.id, data.pos.x, data.pos.y, data.pos.z, data.rot.x, data.rot.y, data.rot.z, data.rot.w)

  })

  // CURRENT TIME FROM SERVER
  room.onMessage("time", (data)=>{    
    //log("SERVER Time is : " + data.currentTime  )    
    ui.updateGameTime(data.currentTime)
  })

  // CURRENT LOBBY TIME FROM SERVER
  room.onMessage("lobbytime", (data)=>{    
    //log("SERVER is in LOBBY WATING state : " + data.currentTime  )    
    ui.updateGameTime(data.currentTime)
    ui.DisplayCursorMessage("NEXT MATCH STARTING IN:", data.currentTime)
  })

  // START MATCH
  room.onMessage("startMatch", ()=>{    
    log("MATCH STARTED" )    
    ui.resetUIScores()
    ui.HideCursorMessage()
    ui.DisplayCursorMessage("GAME STARTED!", "GO GO GO", 2)
    player.matchStarted = true
  })

  room.onMessage("matchIsLive", ()=>{    
        
    //ui.resetUIScores()
    //ui.HideCursorMessage()
    ui.DisplayCursorMessage("GAME IS LIVE!", "GO GO GO", 2)
    player.matchStarted = true
  })

  // END MATCH
  room.onMessage("endMatch", (data)=>{    
    log("MATCH FINISHED" )  

    player.matchStarted = false
    if(data.winner == 0){
      ui.DisplayCursorMessage("GAME ENDED", "BLUE WINS", 4)
    }  
    if(data.winner == 1){
      ui.DisplayCursorMessage("GAME ENDED", "RED WINS", 4)
    }  
    if(data.winner == 2){
      ui.DisplayCursorMessage("GAME ENDED", "TEAMS ARE TIED", 4)
    }  
    
  })

  // CURRENT SCORES FROM SERVER
  room.onMessage("score", (data)=>{    
    log("SCORES ARE UPDATED: " + data.scoreBlue + ":" +  data.scoreRed )    
    ui.updateUIScores(data.scoreBlue, data.scoreRed)
  })


})




// // ground
// let floor = new Entity()
// floor.addComponent(new GLTFShape('models/FloorBaseGrass.glb'))
// floor.addComponent(
//   new Transform({
//     position: new Vector3(23*16/2, 0, 23*16/2),
//     scale: new Vector3(24, 0.1, 24),
//   })
// )
// engine.addEntity(floor)

class SendPlayerDataSystem {
  freq:number = 1/6
  playerRef:Player

  constructor(_player:Player){
      this.playerRef = _player
  }
  update(dt:number){
      if(this.freq >0){
          this.freq -= dt
      }
      else{
          this.freq = 1/6
          //SEND POS DATA
          if(this.playerRef.roomConnected){
              this.playerRef.room.send('playerPos', {id:this.playerRef.id, pos:this.playerRef.cam.position, rot:this.playerRef.getHorizontalRotation()})
              //log("sendPOS: ID: " + this.playerRef.id + ", POS: " + this.playerRef.cam.position)
          }

          //CHECK IF PLAYER IS STANDING ON A DEFAULT PARCEL
          this.playerRef.checkDefaultParcel()

      }
  }
}

engine.addSystem(new SendPlayerDataSystem(player))


