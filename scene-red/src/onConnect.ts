import { getCurrentRealm } from '@decentraland/EnvironmentAPI'
import { getUserData } from '@decentraland/Identity'
import { Cone, cubeColor } from './cones'
import { teamColor } from './modules/teamColors'
import { connect } from './connection'
import { BallManager } from './modules/ball'
import { player, Player } from './modules/player'
import { EnemyManager, EnemyUpdateSystem } from './modules/enemyManager'
import * as ui from './modules/ui'
import { Room } from 'colyseus.js'

export async function onConnect(room: Room) {
  player.addBallManager(new BallManager(100, room))
  player.setRoom(room)
  player.addEnemyManager(new EnemyManager())

  engine.addSystem(new EnemyUpdateSystem(player.enemyManager))

  getUserData().then((myPlayerId) => {
    log("adding observable triggers")  
    onPlayerConnectedObservable.add((enemy) => {
      log("Player entered with ID:" + enemy.userId)
      if (enemy.userId !== myPlayerId?.userId) {    
        log("is not my own id:" +  myPlayerId?.userId)
     //if (true) {    
        //enemy is already in the local cahce
        if (player.enemyManager.getEnemyByID(enemy.userId) != null ) {
          log("we already have this enemy in cache")
          //attach base collider without color
          let existingEnemy = player.enemyManager.getEnemyByID(enemy.userId)
          existingEnemy.collider.addComponentOrReplace(
            new AttachToAvatar({
              avatarId: enemy.userId,
              anchorPointId: AttachToAvatarAnchorPointId.NameTag,
            })
          );
        }
        else{
          //create a new enemy in local cache and attach collider
          log("we don't have this enemy in cache")
          let newEnemy = player.enemyManager.addEnemy(enemy.userId)
          newEnemy.collider.addComponentOrReplace(
            new AttachToAvatar({
              avatarId: enemy.userId,
              anchorPointId: AttachToAvatarAnchorPointId.NameTag,
            })
          );
        }
        //GET THE COLOR OF THE ENEMY FROM SERVER
        room.send('getUserColor', {id: enemy.userId})
      }
    });
  
  
    onPlayerDisconnectedObservable.add((enemy) => {
      if (player.enemyManager.getEnemyByID(enemy.userId) != null ) {
        let existingEnemy = player.enemyManager.getEnemyByID(enemy.userId)
        existingEnemy.collider.removeComponent(AttachToAvatar)    
       log('player not visible anymore: '+ enemy.userId)
      }      
    });
  });

  // REMOVE: add cones
  let blueCone = new Cone(
    { position: new Vector3(6, 1, 14) },
    teamColor.BLUE,
    room
  )

  let redCone = new Cone(
    { position: new Vector3(10, 1, 14) },
    teamColor.RED,
    room
  )

  room.onMessage('setEnemyColor', (data) => {
    switch (data.teamColor) {
      case 0: {
        log('SERVER BLUE')
        //blueCone.activate()
        player.enemyManager.setEnemyColor(data.id,teamColor.BLUE)

        break
      }
      case 1: {
        log('SERVER RED')
       // redCone.activate()
        player.enemyManager.setEnemyColor(data.id,teamColor.RED)
      }
    }
  })

  room.onMessage('throwBall', (data) => {
    
    log('SERVER: BALLTHROW : ' + data.teamColor)
    let color = data.teamColor == 0 ? teamColor.BLUE : teamColor.RED
    player.ballManager
      .spawnBall(color, false)
      .throwBallOther(
        new Vector3(data.pos.x, data.pos.y, data.pos.z),
        new Vector3(data.dir.x, data.dir.y, data.dir.z),
        data.force
      )
  })

  //OTHER PLAYER JOINS THE SERVER ROOM
  room.onMessage('newPlayerJoined', (data) => {
    log('new player JOINED: ' + data.id, +': ' + data.color)

    switch (data.teamColor) {
      case teamColor.BLUE: {
        log('NEW PLAYER BLUE')
        //blueCone.activate()
        player.enemyManager.addEnemy(data.id)
        player.enemyManager.setEnemyColor(data.id,teamColor.BLUE)

        break
      }
      case 1: {
        log('NEW PLAYER RED')
       // redCone.activate()
         player.enemyManager.addEnemy(data.id)
        player.enemyManager.setEnemyColor(data.id,teamColor.RED)
      }
    }
    // switch(data.color){
    //   case 0:
    //     {
    //       player.enemyManager.addEnemy(data.id, teamColor.BLUE)
    //     }
    //   case 1:
    //     {
    //       player.enemyManager.addEnemy(data.id, teamColor.RED)
    //     }
    // }
    
  })

  //OTHER PLAYER LEAVES THE SERVER ROOM
  room.onMessage('playerLeft', (data) => {
    log('player left the game: ' + data.id)

    player.enemyManager.removeEnemy(data.id)
  })

  // PLAYER GETS THEIR OWN ID
  room.onMessage('updateID', (data) => {
    log('Your ID is: ' + data.id)

    player.id = data.id
  })

  // OTHER PLAYER POSITION GETS UPDATED
  room.onMessage('updatePos', (data) => {
    // log("Updating enemy POS: " + data.id  + ", " + data.pos.x + ", " + data.pos.y + ", " + data.pos.z)

    // player.enemyManager.updatePlayerPos(
    //   data.id,
    //   data.pos.x,
    //   data.pos.y,
    //   data.pos.z,
    //   data.rot.x,
    //   data.rot.y,
    //   data.rot.z,
    //   data.rot.w
    // )
  })

  // CURRENT TIME FROM SERVER
  room.onMessage('time', (data) => {
    //log("SERVER Time is : " + data.currentTime  )
    ui.updateGameTime(data.currentTime)
  })

  // CURRENT LOBBY TIME FROM SERVER
  room.onMessage('lobbytime', (data) => {
    //log("SERVER is in LOBBY WATING state : " + data.currentTime  )
    ui.updateGameTime(data.currentTime)
    ui.showLobbyMessage(true)
   // ui.DisplayCursorMessage('NEXT MATCH STARTING IN:', data.currentTime)
  })

  // START MATCH
  room.onMessage('startMatch', () => {
    log('MATCH STARTED')
    ui.showLobbyMessage(false)
    ui.resetUIScores()
    ui.HideCursorMessage()
    ui.DisplayCursorMessage('GAME STARTED!', 'GO GO GO', 2)
    player.matchStarted = true
  })

  room.onMessage('matchIsLive', () => {
    //ui.resetUIScores()
    //ui.HideCursorMessage()
    ui.showLobbyMessage(false)
    ui.DisplayCursorMessage('GAME IS LIVE!', 'GO GO GO', 2)
    player.matchStarted = true
  })

  // END MATCH
  room.onMessage('endMatch', (data) => {
    log('MATCH FINISHED')

    player.matchStarted = false
    if (data.winner == 0) {
      ui.DisplayCursorMessage('GAME ENDED', 'BLUE WINS', 4)
    }
    if (data.winner == 1) {
      ui.DisplayCursorMessage('GAME ENDED', 'RED WINS', 4)
    }
    if (data.winner == 2) {
      ui.DisplayCursorMessage('GAME ENDED', 'TEAMS ARE TIED', 4)
    }
  })

  // CURRENT SCORES FROM SERVER
  room.onMessage('score', (data) => {
    log('SCORES ARE UPDATED: ' + data.scoreBlue + ':' + data.scoreRed)
    ui.updateUIScores(data.scoreBlue, data.scoreRed)
  })


  class CheckParcelSystem {
    freq: number = 1 / 6
    playerRef: Player

    constructor(_player: Player) {
      this.playerRef = _player
    }
    update(dt: number) {
      if (this.freq > 0) {
        this.freq -= dt
      } else {
        this.freq = 1 / 6
        //SEND POS DATA
        // if (this.playerRef.roomConnected) {
        //   this.playerRef.room.send('playerPos', {
        //     id: this.playerRef.id,
        //     pos: this.playerRef.cam.position,
        //     rot: this.playerRef.getHorizontalRotation(),
        //   })
        
          //log("sendPOS: ID: " + this.playerRef.id + ", POS: " + this.playerRef.cam.position)
        //}

        //CHECK IF PLAYER IS STANDING ON A DEFAULT PARCEL
        this.playerRef.checkDefaultParcel()
      }
    }
  }

  engine.addSystem(new CheckParcelSystem(player))

}
