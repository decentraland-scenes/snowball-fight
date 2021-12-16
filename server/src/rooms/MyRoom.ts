import { Room, Client, Delayed } from 'colyseus'
import { cubeColor, MyRoomState, Player, teamColor } from './schema/MyRoomState'
import  { initializeApp, applicationDefault, cert } from '../../node_modules/firebase-admin/lib/app'
import { getFirestore, Timestamp, FieldValue } from '../../node_modules/firebase-admin/lib/firestore'
import { serviceAccount } from '../firebase/firebase_api'

/////
/////
//TESTING WITHOUT FIREBASE: REMOVE OR SET TRUE FOR PROD
const WITH_FIREBASE_SAVING = false
/////
/////
/////

export class MyRoom extends Room<MyRoomState> {

  public matchIntervalLoop!: Delayed;
  public roundTime: number = 1000 * 60 * 0.5  
  public lobbyTime: number = 1000 * 60 * 0.2  
  private db:FirebaseFirestore.Firestore    
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

    //SCORE DATABASE SETUP
    if(WITH_FIREBASE_SAVING){
      var admin = require("firebase-admin");

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
  
      this.db = getFirestore();
    }
    
    
    //this.state.startTime = this.clock.currentTime
    this.state.startTime = new Date().toISOString()
   
    
    //update time every 1 second
    this.setSimulationInterval((deltaTime) => this.update(deltaTime), 1000);

   
    this.onMessage('pickColor', (client, message) => {
      const player = this.state.players.get(client.sessionId)      
      player.teamColor = message.teamColor
      this.broadcast("flashColor", {id:player.id, teamColor: message.teamColor})      
      console.log(player.name, ' picked color ', message.teamColor)
      player.score ++

    })
  
    this.onMessage('throwBall', (client, message) => {
      const player = this.state.players.get(client.sessionId)            
      this.broadcast("throwBall", {pos:message.pos, dir: message.dir, force: message.force, teamColor:player.teamColor, id:player.id },{except: client})      
      console.log(player.name, ' threw a snowball ', message.pos, message.dir, message.force)
    })
  
    this.onMessage('enemyHit', (client, message) => {
      const enemy = this.state.players.get(message.id)            
      const player = this.state.players.get(client.sessionId)  

      if(this.state.inMatch){
        player.score ++
        console.log("player score: "+ player.score )
        switch(enemy.teamColor){

          // POINT FOR RED TEAM (blue player was hit)
          case 0:{
            this.state.redScore ++
            console.log("incrementing red Score: " + this.state.redScore)
           
            // redTeamDoc.update({ 
            //   score: this.state.redScore
            // });
            break
          }
          // POINT FOR BLUE TEAM (blue player was hit)
          case 1:{
  
            this.state.blueScore ++
            console.log("incrementing blue Score: " + this.state.blueScore)
            // blueTeamDoc.update({  
            //   score: this.state.blueScore
            // });
            break
          }
        }
        this.broadcast("score", {scoreBlue:this.state.blueScore, scoreRed:this.state.redScore })       
        console.log(message.id, ' was hit!! they were on team: ', enemy.teamColor)
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
        console.log(newPlayer.name, 'joined the BLUE team! => ', options.color, options.userData)
        newPlayer.teamColor = teamColor.BLUE
        break
      }
      case 1:{
        console.log(newPlayer.name, 'joined the RED team! => ', options.color, options.userData)
        newPlayer.teamColor = teamColor.RED
        break
      }
    }    
    
    client.send("updateID", {id:client.id} )
    this.broadcast("newPlayerJoined", {id:client.id, color:newPlayer.teamColor}, {except:client})

    //send all current players to the new player
    this.state.players.forEach( (player)=>{
      client.send("newPlayerJoined", {id:player.id, color:player.teamColor})
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


  async saveScores(_blueScore:number, _redScore:number){

    if(WITH_FIREBASE_SAVING){

      if((_blueScore > 0) || (_redScore > 0)){
        const res = await this.db.collection('matches').add({
          timeStamp:  this.state.startTime,
          blueScore:  _blueScore,
          redScore:  _redScore           
        });
    
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
