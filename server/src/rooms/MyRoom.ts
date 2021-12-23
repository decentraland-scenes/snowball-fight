import { Room, Client, Delayed } from 'colyseus'
import { AppCheck } from 'firebase-admin/lib/app-check/app-check';
import { cubeColor, MyRoomState, Player, teamColor } from './schema/MyRoomState'
import { db } from "../firestore";
//import  { initializeApp, applicationDefault, cert } from '../../node_modules/firebase-admin/lib/app'
//import { getFirestore} from '../../node_modules/firebase-admin/lib/firestore'

/////
/////
//TESTING WITHOUT FIREBASE: SET TRUE FOR PROD
const WITH_FIREBASE_SAVING = true
/////
/////
/////

export class MyRoom extends Room<MyRoomState> {

  public matchIntervalLoop!: Delayed;
  public roundTime: number = 1000 * 60 * 9  
  public lobbyTime: number = 1000 * 60 * 1  
  //private db:FirebaseFirestore.Firestore    
  private matchElapsed:number = 0
  private lobbyElapsed:number = 0

  constructor(){
    super()
    

    //
    // !!!!!!! DELETE EVERY MATCH !!!!!!!!!!!!
    //
    // this.db.collection('matches').get().then(querySnapshot => {
    //   querySnapshot.docs.forEach(snapshot => {
    //       snapshot.ref.delete();
    //   })
    // })
    //
    // !!!!!! DELETE EVERY MATCH !!!!!!!!!!!!
    //

  }
  // GAME SERVER LOOP
  update(dt:number){

    if(this.state.inMatch){

      this.matchElapsed += dt

      if(this.matchElapsed < this.roundTime){
        this.broadcast("time", {currentTime:Math.floor((this.roundTime - this.matchElapsed)/1000)})
      }
      else{
        this.state.inMatch = false
        this.lobbyElapsed = 0
        this.saveScores(this.state.blueScore, this.state.redScore)

        if(this.state.blueScore > this.state.redScore){
          this.broadcast("endMatch", {winner:0})
        }
        if(this.state.blueScore < this.state.redScore){
          this.broadcast("endMatch", {winner:1})
        }
        if(this.state.blueScore == this.state.redScore){
          this.broadcast("endMatch", {winner:2})
        }

        if(this.state.bestPlayerScore > 0){
          this.broadcast('bestPlayer', {name:this.state.bestPlayerName, team:this.state.bestPlayerTeam, score:this.state.bestPlayerScore})
        }
       
      }     
    }
    else{
      this.lobbyElapsed += dt
      if(this.lobbyElapsed < this.lobbyTime){
        this.broadcast("lobbytime", {currentTime:Math.floor((this.lobbyTime - this.lobbyElapsed)/1000)})
      }
      else{
        this.state.inMatch = true
        this.matchElapsed = 0

        this.state.resetScores()
        //this.state.startTime = this.clock.currentTime
        this.state.startTime = new Date().toISOString()
        
        this.broadcast("startMatch")

      }
    }
  }

  onCreate(options: any) {
    this.setState(new MyRoomState())

    if(options.realm){
      this.state.server = options.realm
    }
    if(options.room){
      this.state.island = options.room
    }
    
    

    //SCORE DATABASE SETUP
    if(WITH_FIREBASE_SAVING){  
  
      //this.db = getFirestore();
    }
    
    
    //this.state.startTime = this.clock.currentTime
    this.state.startTime = new Date().toISOString()
   
    
    //update time every 1 second
    this.setSimulationInterval((deltaTime) => this.update(deltaTime), 1000);

   
    this.onMessage('pickColor', (client, message) => {
      const player = this.state.players.get(client.sessionId)      
      player.teamColor = message.teamColor
      this.broadcast("setEnemyColor", {id:player.id, teamColor: message.teamColor})      
      console.log(player.name, ' is now color ', message.teamColor)
      //player.score ++

    })
  
    this.onMessage('throwBall', (client, message) => {
      const player = this.state.players.get(client.sessionId)            
      this.broadcast("throwBall", {pos:message.pos, dir: message.dir, force: message.force, teamColor:player.teamColor, id:player.id },{except: client})      
      console.log(player.name, ' threw a snowball ', message.pos, message.dir, message.force)
    })
  
    this.onMessage('enemyHit', (client, message) => {

      let enemy:Player = null
      this.state.players.forEach((player) =>{
        if(player.wallet == message.id){
          enemy = player
        }
      })
      const player = this.state.players.get(client.sessionId)  
      console.log("enemy hit: "+ message.id,  )
      

      if(this.state.inMatch && enemy != null){
        console.log("enemy color: "+ enemy.teamColor  )
        switch(enemy.teamColor){
          // POINT FOR RED TEAM (blue player was hit)
          case 0:{
            if(player.teamColor == 1){
              this.state.redScore ++
              player.score ++
              console.log("player score: "+ player.score )
              console.log("incrementing red Score: " + this.state.redScore)
            }
            else{
              console.log("teammate hit: " + this.state.redScore)
            }            
            break
          }

          // POINT FOR BLUE TEAM (red player was hit)
          case 1:{
            if(player.teamColor == 0){
              this.state.blueScore ++
              player.score ++
              console.log("player score: "+ player.score )
              console.log("incrementing blue Score: " + this.state.blueScore)
            }
            else{
              console.log("teammate hit: " + this.state.blueScore)
            }           
            break
          }
        }
        this.broadcast("score", {scoreBlue:this.state.blueScore, scoreRed:this.state.redScore })       
        console.log(message.id, ' was hit!! they were on team: ', enemy.teamColor)

        this.state.checkBestPlayer(player)

      }      
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

    this.onMessage('getUserColor', (client, message) => {
      let enemy:Player = null
      this.state.players.forEach((player) =>{
        if(player.wallet == message.id){
          enemy = player
        }
      })

      if(enemy != null){
        client.send('setEnemyColor', {id:message.id, color:enemy.teamColor })
        console.log('found enemy, sending color', enemy.teamColor)
      }           
      
    })

  }

  onJoin(client: Client, options: any) {
 
    const newPlayer = new Player(
      client.id,
      options.userData.displayName || 'Anonymous',
      options.userData.userId
    )
    this.state.players.set(client.sessionId, newPlayer)
    
    switch(options.color){
      case 0:{
        console.log(newPlayer.name, 'joined the BLUE team! => ', options.color)
        newPlayer.teamColor = teamColor.BLUE
        break
      }
      case 1:{
        console.log(newPlayer.name, 'joined the RED team! => ', options.color)
        newPlayer.teamColor = teamColor.RED
        break
      }
    }    
    
    client.send("updateID", {id:newPlayer.wallet} )
    this.broadcast("newPlayerJoined", {id:newPlayer.wallet, color:newPlayer.teamColor}, {except:client})

    //send all current players to the new player
    this.state.players.forEach( (player)=>{
      client.send("newPlayerJoined", {id:player.wallet, color:player.teamColor})
    })

    if(this.state.inMatch){
      client.send("score", {scoreBlue:this.state.blueScore, scoreRed:this.state.redScore })   
      client.send("matchIsLive")   
    }
    
      
    
  }

  onLeave(client: Client, consented: boolean) {
    const player = this.state.players.get(client.sessionId)
    console.log(player.name, 'left!')
    this.broadcast("playerLeft", {id:client.id }, {except:client})
    this.state.players.delete(client.sessionId)
  }

  sendAllPos(client:Client){

    this.broadcast("positions", {id:client.id }, {except:client})
  }


  // SAVE SCORES TO FIREBASE SERVER
  async saveScores(_blueScore:number, _redScore:number){

    if(WITH_FIREBASE_SAVING){
      if((_blueScore > 0) || (_redScore > 0)){

        const matchId = (this.state.startTime + "-" + this.state.server )

        const write = await db.collection('matches').doc(matchId).set({
          timeStamp:  this.state.startTime,
          blueScore:  _blueScore,
          redScore:  _redScore,
          server: this.state.server,
          bestPlayer: this.state.bestPlayerName,
          bestPlayerTeam: this.state.bestPlayerTeam,
          bestPlayerScore: this.state.bestPlayerScore

        });

        const res =  db.collection('matches').doc(matchId)
    
        this.state.players.forEach( (player) =>{    
          console.log('adding player: ', player.name, player.score, player.teamColor, player.wallet)    
          res.collection('players').doc(player.wallet).set({
            name: player.name ,
            score: player.score,
            team :player.teamColor,
            wallet: player.wallet
    
          })
        });
      }
    }
  }

  onDispose() {
    if(this.state.inMatch){
      this.saveScores(this.state.blueScore, this.state.redScore)    
      console.log('Disposing room mid match')
    }  
    else{
      console.log('Disposing room...')
    }    

    
  }
}
