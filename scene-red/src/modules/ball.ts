// import { scene } from "./sceneData";
// import { physicsBall } from "./physicsBall";
// //import { sendToServer } from "./playfabapi";
// import { player } from "./playerData";
import { distance, ToDegrees, reflectVec3 } from './utilities'
import { ExplosionInfo, Explosion, splatSpawner } from './explosion'
// //import { match } from "./match";
import * as mySounds from './sounds'
//import { PhysicsBallCollider } from "./physicsBall";
//import { worldNoGravity, physicsMaterial, FIXED_TIME_STEPS, MAX_TIME_STEPS } from "./physics/world";
import { player, SelfCollider } from './player'
import { teamColor } from './teamColors'
import { Room } from 'colyseus.js'
import { OtherCollider } from './otherPlayer'
import { PredefinedEmote, triggerEmote } from '@decentraland/RestrictedActions'

// import { setKickForceUI } from "./ui";

export class Ball {
  gravity: number = 5
  active: boolean = false
  ballRadius: number = 0.2
  moveVector: Vector3 = Vector3.Zero()
  currentSpeed: number = 0
  maxSpeed: number = 10
  resistance: number = 0.98
  kickForce: number = 1
  maxForce: number = 1.0
  kickForceBase: number = 0.1
  kickArrowBase: number = 0.75
  ballEntity: Entity
  showHelperArrows: boolean = true
  increaseKickStrength: boolean = false
  arrowColorFraction: number = 0
  kickDistance: number = 40
  kickable: boolean = false
  goalTimeout: boolean = true
  isBallOverBaseline1: boolean = false
  isBallOverBaseline2: boolean = false
  ballShape: GLTFShape
  throwSound: AudioSource
  hitSound: AudioSource
  bounceEmitter: Entity
  kickID: number = 0
  ownBall: boolean = true
  room: Room
  teamColor: teamColor = teamColor.BLUE
  myBall: boolean = false
  //physicsCollider:PhysicsBallCollider

  constructor(room: Room, _teamColor: teamColor, _myBall: boolean) {
    this.teamColor = _teamColor
    this.room = room
    this.myBall = _myBall

    this.ballShape = new GLTFShape('models/snowball.glb')
    this.ballEntity = new Entity()
    this.bounceEmitter = new Entity()

    //this.moveVector = new Vector3(0,0,0)

    this.ballEntity.addComponent(this.ballShape)
    this.ballEntity.addComponent(
      new Transform({
        position: new Vector3(8, 8, 8),

        rotation: Quaternion.Euler(0, 180, 0),
        scale: new Vector3(0.75, 0.75, 0.75),
      })
    )

    this.throwSound = new AudioSource(mySounds.clipThrow)
    this.hitSound = new AudioSource(mySounds.clipHit)
    this.ballEntity.addComponent(this.throwSound)

    this.bounceEmitter.addComponent(
      new Transform({ position: new Vector3(0, 0, 0) })
    )
    this.bounceEmitter.addComponent(this.hitSound)
    this.bounceEmitter.setParent(this.ballEntity)
    engine.addEntity(this.ballEntity)

    this.active = true

    // this.physicsCollider = new PhysicsBallCollider(
    //     new Transform({
    //         position: new Vector3(0, 0, 0),
    //         scale: new Vector3( 0.75, 0.75, 0.75)
    //     }),
    //     physicsMaterial,
    //     worldNoGravity
    //     )
  }

  throwBallPlayer(pos: Vector3, dir: Vector3, force: float) {
    //log("pos: " + pos + ", dir: " + dir + ", force: " + force)
    this.ownBall = true
    const ballTransform = this.ballEntity.getComponent(Transform)

    ballTransform.position.copyFrom(pos)

    this.moveVector = dir.multiplyByFloats(force, force, force)
    this.throwSound.playOnce()
    this.active = true
    this.room.send('throwBall', { pos: pos, dir: dir, force: force })
  }

  throwBallOther(pos: Vector3, dir: Vector3, force: float) {
    this.ownBall = false
    const ballTransform = this.ballEntity.getComponent(Transform)

    ballTransform.position.copyFrom(pos)

    this.moveVector = dir
    this.throwSound.playOnce()
    this.active = true
  }

  setKickID(ID: number) {
    this.kickID = ID
  }

  getBallPos(): Vector3 {
    return this.ballEntity.getComponent(Transform).position
  }

  setBallPosXYZ(x: number, y: number, z: number) {
    this.ballEntity.getComponent(Transform).position = new Vector3(x, y, z)
  }

  setBallPos(pos: Vector3) {
    this.ballEntity.getComponent(Transform).position = pos
  }

  onCollide(_hitPoint: Vector3, _normal: Vector3) {
    if (this.active) {
      // this.hitSound.playOnce()
      let explosion = new Explosion(
        _hitPoint,
        Quaternion.FromToRotation(
          Vector3.Up(),
          _normal.rotate(Quaternion.RotationAxis(_normal, Math.random() * 360))
        )
      )
      this.active = false
      this.hide()
    }
  }
  hide() {
    const pos = this.ballEntity.getComponent(Transform).position
    this.setBallPosXYZ(pos.x, -0.3, pos.z)
  }
  sendHit(enemyId: string) {
    this.room.send('enemyHit', { id: enemyId, pos: player.cam.position })
  }
}

//export const ball = new Ball()

export class BallManager {
  balls: Ball[]
  maxCount: number
  ballSystem: BallThrowSystem
  room: Room

  constructor(_ballCount: number, room: Room) {
    this.room = room
    this.balls = []
    this.maxCount = _ballCount
    this.ballSystem = new BallThrowSystem(this)
    engine.addSystem(this.ballSystem)
  }

  spawnBall(_teamColor: number, _myBall: boolean): Ball {
    log('spawning ball is mine: ' + _myBall)
    if (this.balls.length < this.maxCount) {
      let ball = new Ball(this.room, _teamColor, _myBall)
      this.balls.push(ball)
      return ball
    } else {
      let instance = this.balls.shift()
      this.balls.push(instance)
      instance.teamColor = _teamColor
      instance.myBall = _myBall
      return instance
    }
  }
}

class BallThrowSystem {
  kickDirection = new Vector3(0, 1, 0)
  kickArrowRotation = new Quaternion()
  physicsCast: PhysicsCast
  ballManager: BallManager

  constructor(_ballManager: BallManager) {
    this.physicsCast = PhysicsCast.instance
    this.ballManager = _ballManager
  }

  update(dt: number) {
    // worldNoGravity.step(FIXED_TIME_STEPS, dt, MAX_TIME_STEPS)

    for (let ball of this.ballManager.balls) {
      if (ball.active) {
        const transform = ball.ballEntity.getComponent(Transform)

        //ball physics
        ball.moveVector.y -= ball.gravity * dt * 0.1

        //ground hit
        if (transform.position.y + ball.moveVector.y <= ball.ballRadius) {
          ball.onCollide(
            new Vector3(transform.position.x, 0.05, transform.position.z),
            Vector3.Up()
          )
        }

        ball.moveVector = ball.moveVector.multiplyByFloats(
          ball.resistance,
          ball.resistance,
          ball.resistance
        )

        ball.currentSpeed = ball.moveVector.length()
        let nextPosX = transform.position.x + ball.moveVector.x
        let nextPosY = transform.position.y + ball.moveVector.y
        let nextPosZ = transform.position.z + ball.moveVector.z
        let nextPos = new Vector3(nextPosX, nextPosY, nextPosZ)

        //check hitting colliders
        let originPos = new Vector3(
          transform.position.x,
          transform.position.y,
          transform.position.z
        )
        let targetPos = new Vector3(nextPos.x, nextPos.x, nextPos.x)

        let moveVector = transform.position
          .subtract(nextPos)
          .multiplyByFloats(1, 0, 1)
        let moveDistance = moveVector.length()
        let rayCastDistance = moveDistance < 1 ? 1 : moveDistance

        // log("raycast distance: " + rayCastDistance)

        let rayBallCollide: Ray = {
          origin: originPos,
          direction: ball.moveVector,
          distance: rayCastDistance,
        }

        this.physicsCast.hitFirst(rayBallCollide, (e) => {
          if (e.didHit) {
            //
            if (e.entity.meshName == 'player_collider') {
              //player was hit
              if (
                engine.entities[e.entity.entityId].hasComponent(SelfCollider)
              ) {
                //hit by a teammate
                if (ball.teamColor == player.color) {
                  log('a friendly ' + ball.teamColor + ' ball just hit you')
                }
                //hit by enemy
                else {
                  log('you were hit by enemy ' + ball.teamColor)
                  let normal = new Vector3(
                    e.hitNormal.x,
                    e.hitNormal.y,
                    e.hitNormal.z
                  )
                  normal.normalize()
                  let hitPoint = new Vector3(
                    e.hitPoint.x,
                    e.hitPoint.y,
                    e.hitPoint.z
                  )
                  ball.onCollide(hitPoint, normal)
                  triggerEmote({ predefined: PredefinedEmote.SNOWBALLHIT })
                  //player.clipHit.play(true)
                }
              }
              //someone else was hit
              else if (
                engine.entities[e.entity.entityId].hasComponent(OtherCollider)
              ) {
                engine.entities[e.entity.entityId].getComponent(OtherCollider)
                //teammate was hit
                if (
                  ball.teamColor ==
                  engine.entities[e.entity.entityId].getComponent(OtherCollider)
                    .color
                ) {
                  log(
                    'Teammate player hit with ' +
                      ball.teamColor +
                      ' ball (other player is ' +
                      engine.entities[e.entity.entityId].getComponent(
                        OtherCollider
                      ).color +
                      ')'
                  )
                }
                //enemy was hit
                else {
                  log(
                    'Enemy player hit with ' +
                      ball.teamColor +
                      ' ball (enemy color is: ' +
                      engine.entities[e.entity.entityId].getComponent(
                        OtherCollider
                      ).color
                  )
                  let normal = new Vector3(
                    e.hitNormal.x,
                    e.hitNormal.y,
                    e.hitNormal.z
                  )
                  normal.normalize()
                  let hitPoint = new Vector3(
                    e.hitPoint.x,
                    e.hitPoint.y,
                    e.hitPoint.z
                  )
                  ball.onCollide(hitPoint, normal)

                  if (ball.myBall) {
                    ball.sendHit(
                      engine.entities[e.entity.entityId].getComponent(
                        OtherCollider
                      ).id
                    )
                  }
                }
              }
            } else {
              log('environment hit with ' + ball.teamColor + ' ball')
              let normal = new Vector3(
                e.hitNormal.x,
                e.hitNormal.y,
                e.hitNormal.z
              )
              normal.normalize()
              let hitPoint = new Vector3(
                e.hitPoint.x,
                e.hitPoint.y,
                e.hitPoint.z
              )
              ball.onCollide(hitPoint, normal)
            }
          }
        })
        /* for (let collider of this.colliderGroup.entities) {
                        let newDir = collider.getComponent(VerticalCyllinderCollider).collide(nextPos, ball.moveVector, ball.ballRadius)

                        if(newDir != null){
                        ball.moveVector = newDir
                        }
                        
                    } */

        //move ball
        if (
          ball.currentSpeed < 0.05 &&
          transform.position.y < 2 * ball.ballRadius + 0.1
        ) {
          ball.currentSpeed = 0
          ball.moveVector.setAll(0)
          transform.position.y = ball.ballRadius
        } else {
          let rotateAxis = Vector3.Cross(
            ball.moveVector,
            Vector3.Down()
          ).normalize()
          let theta = moveDistance / ball.ballRadius // in radians
          let thetaDegrees = (theta * 180) / Math.PI

          transform.translate(ball.moveVector)
          //ball.physicsCollider.setPos(transform.position)

          // log('ball pos    : ' + transform.position)
          // log('collider pos: ' + ball.physicsCollider.getPos())

          let q = Quaternion.RotationAxis(rotateAxis, thetaDegrees * 60)
          transform.rotation = q.multiply(transform.rotation)
        }
      }
    }
  }
}

// const wallShape = new CANNON.Box(new CANNON.Vec3(6, 6, 6))
//   const wallNorth = new CANNON.Body({
//     mass: 0,
//     shape: wallShape,
//     position: new CANNON.Vec3(32,0,32),
//   })
//   wallNorth.addEventListener('collide', ()=>{
//       log("box triggered")
//   })
//   wallNorth.wakeUp()
// worldNoGravity.addBody(wallNorth)

// input.subscribe("BUTTON_DOWN", ActionButton.POINTER, true, e => {
//     //log("pointer POINTER Down", e)
//    // ball.increaseKickStrength = true

//    let ballPos = ball.getBallPos()

//    if(player.getCurrentWeapon().fire(player.feetPos.add( new Vector3(0.5, 1.3, 1.5).rotate(player.camera.rotation)), Vector3.Forward().rotate(player.camera.rotation))){

//     if(ball.kickable){
//       if(e.hit && e.hit.length <= ball.kickDistance){

//           // log("SHOT AT: " + e.hit.meshName)
//           if(e.hit.meshName == 'ball_collider'){

//               let hitEntity = engine.entities[e.hit.entityId]
//               let force = player.getCurrentWeapon().force
//              // if(match.isPractice){
//                   //ball.kickBall(ballPos, ballPos.subtract(e.hit.hitPoint).normalize(), force )
//                   //ball.moveVector = ballPos.subtract(e.hit.hitPoint).normalize().multiplyByFloats(force, force, force)

//                   physicsBall.playerThrow(ballPos, ballPos.subtract(e.hit.hitPoint).normalize(), force*10)
//              // }
//               // if(match.isMultiplayer){
//               //  // sendToServer("PDF#" + ball.getBallPos() + "#" + ballPos.subtract(e.hit.hitPoint).normalize()  + "#" + ball.kickForce + "#" + ball.kickID)
//               // }

//               log("kicked Ball from distance" + e.hit.length)
//           }

//       }
//     }
//    }

/*   if(kickable){
        if(e.hit){
        // log("SHOT AT: " + e.hit.meshName) 
            if(e.hit.meshName == 'ball_collider'){

            // const ballData = ball.getComponent(ballInfo)   

            //let hitEntity = engine.entities[e.hit.entityId] 
            
            
            //ball.getComponent(ballInfo).moveVector = ball.getComponent(Transform).position.subtract(e.hit.hitPoint).multiplyByFloats(ballData.kickForce, ballData.kickForce, ballData.kickForce)   
            
            log("highlighted Ball", e)      
            }

        }
    } */
//})
