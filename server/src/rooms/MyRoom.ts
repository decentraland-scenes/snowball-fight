import { Room, Client, Delayed } from 'colyseus'
import { cubeColor, MyRoomState, Player, teamColor } from './schema/MyRoomState'
import  { initializeApp, applicationDefault, cert } from '../../node_modules/firebase-admin/lib/app'
import { getFirestore, Timestamp, FieldValue } from '../../node_modules/firebase-admin/lib/firestore'
import { serviceAccount } from '../firebase/firebase_api'

export class MyRoom extends Room<MyRoomState> {

  public delayedInterval!: Delayed;
  public roundTime: number = 1000 * 60 * 10  
  //public endTime: number = this.roundTime

  onCreate(options: any) {
    this.setState(new MyRoomState())
    
    //SCORE DATABASE SETUP
    var admin = require("firebase-admin");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    const db = getFirestore();
    const docRef = db.collection('scores').doc('leaderboard');

    //TODO:sync to UTC schedule
    // start the clock ticking
    this.clock.start();  
    
    //this.endTime = this.clock.currentTime + this.roundTime

        // Set an interval and store a reference to it
    // so that we may clear it later
    this.delayedInterval = this.clock.setInterval(() => {
        console.log("Time now " + this.clock.currentTime);
        console.log("Time left " + (this.roundTime - this.clock.elapsedTime));
        this.broadcast("time", {currentTime:Math.floor((this.clock.elapsedTime)/1000)})
    }, 1000);

    // After 10 seconds clear the timeout;
    // this will *stop and destroy* the timeout completely
    this.clock.setTimeout(() => {
        this.delayedInterval.clear();
    }, this.roundTime);


    this.onMessage('pickColor', (client, message) => {
      const player = this.state.players.get(client.sessionId)      
      player.teamColor = message.teamColor
      this.broadcast("flashColor", {id:player.id, teamColor: message.teamColor})      
      console.log(player.name, ' picked color ', message.teamColor)
      player.score ++

      docRef.update({
        userID: player.wallet,
        team: player.teamColor,
        score: player.score
      });

    })
  
    this.onMessage('throwBall', (client, message) => {
      const player = this.state.players.get(client.sessionId)            
      this.broadcast("throwBall", {pos:message.pos, dir: message.dir, force: message.force, teamColor:player.teamColor, id:player.id },{except: client})      
      console.log(player.name, ' threw a snowball ', message.pos, message.dir, message.force)
    })
  
    this.onMessage('enemyHit', (client, message) => {
      const player = this.state.players.get(message.id)            
      
      console.log(message.id, ' was hit!! they were on team: ', player.teamColor)
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
