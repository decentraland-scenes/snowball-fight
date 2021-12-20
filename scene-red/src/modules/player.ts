import { triggerEmote, PredefinedEmote } from '@decentraland/RestrictedActions'
import { Room } from 'colyseus.js'
import { Ball, BallManager } from './ball'
import { EnemyManager } from './enemyManager'
import { teamColor } from './teamColors'
import { updateAmmo } from './ui'

@Component('SelfCollider')
export class SelfCollider {}

export class Player {
  id: string
  collider: Entity
  ballManager: BallManager
  enemyManager: EnemyManager
  cam: Camera
  color: teamColor = teamColor.BLUE
  //testDummy: Entity
  //dummyAnimator: Animator
  //clipThrow: AnimationState
  //clipHit: AnimationState
  ammo: number = 0
  maxAmmo: number = 10
  ammoSys: AmmoTimerSystem
  matchStarted: boolean = false

  roomConnected: boolean = false
  room: Room
  physicsCastParcel: PhysicsCast
  isOnDefaultParcel: boolean = false
  inCooldown: boolean = false

  constructor(color: teamColor) {
    this.color = color
    this.physicsCastParcel = PhysicsCast.instance

    this.id = '0x0'
    this.cam = Camera.instance
    this.collider = new Entity()
    this.collider.addComponent(
      new Transform({
        position: new Vector3(0, 0, 0),
      })
    )
    if(color == teamColor.BLUE){
      this.collider.addComponent(
        new GLTFShape('models/self_marker_blue.glb')
      ).isPointerBlocker = false
    }
    else{
      this.collider.addComponent(
        new GLTFShape('models/self_marker_red.glb')
      ).isPointerBlocker = false
    }
    this.collider.addComponent(new SelfCollider())

    engine.addEntity(this.collider)

    this.collider.setParent(Attachable.AVATAR)

    //animation testing
    // this.testDummy = new Entity()
    // this.testDummy.addComponent(
    //   new Transform({ position: new Vector3(0, -1.0, 0) })
    // )
    // engine.addEntity(this.testDummy)
    // this.testDummy.setParent(Attachable.AVATAR)
    // this.testDummy.addComponent(new GLTFShape('models/snowball_anim.glb'))

    // this.dummyAnimator = new Animator()
    // this.clipThrow = new AnimationState('Snowball_Throw')
    // this.clipHit = new AnimationState('Snowball_Hit')

    // this.testDummy.addComponent(this.dummyAnimator)
    // this.dummyAnimator.addClip(this.clipThrow)
    // this.dummyAnimator.addClip(this.clipHit)

    // this.clipHit.looping = false
    // this.clipThrow.looping = false

    this.isOnDefaultParcel = false

    this.ammoSys = new AmmoTimerSystem(this)
    engine.addSystem(this.ammoSys)

    // this.sendDataSys = new SendPlayerDataSystem(this)
    //engine.addSystem(this.sendDataSys)
  }

  addBallManager(ballManager: BallManager) {
    this.ballManager = ballManager
  }
  addEnemyManager(_enemyManager: EnemyManager) {
    this.enemyManager = _enemyManager
  }
  useAmmo() {
    if (this.roomConnected) {
      this.ammo -= 1

      if (this.ammo < 0) {
        this.ammo = 0
      }
      player.inCooldown = true
      updateAmmo(this.ammo, this.maxAmmo)
    }
  }

  setColor(_teamColor: number) {
    switch (_teamColor) {
      case teamColor.RED: {
        this.color = teamColor.RED
        break
      }
      case teamColor.BLUE: {
        this.color = teamColor.BLUE
        break
      }
    }
  }
  setRoom(_room: Room) {
    this.room = _room
    this.roomConnected = true
  }
  getHorizontalRotation(): Quaternion {
    return Quaternion.FromToRotation(
      Vector3.Forward(),
      Vector3.Forward().rotate(this.cam.rotation).multiplyByFloats(1, 0, 1)
    )
  }
  collectAmmo() {
    this.ammoSys.isActive = true
    triggerEmote({ predefined: PredefinedEmote.CRAFTING })
  }
  stopCollectAmmo() {
    this.ammoSys.isActive = false
  }
  checkDefaultParcel() {
    let result = false

    let rayDown: Ray = {
      origin: this.cam.position,
      direction: Vector3.Down(),
      distance: 3,
    }

    this.physicsCastParcel.hitFirst(rayDown, (e) => {
      if (e.didHit) {
        //log("player Standing on : " + e.entity.meshName)
        //
        if (e.entity.meshName.substring(0, 3) == 'EP_') {
          // log("player is on default parcel")
          this.isOnDefaultParcel = true
        } else {
          this.isOnDefaultParcel = false
        }
      }
    })
  }
}

class AmmoTimerSystem {
  isActive: boolean = false
  elapsed: number = 0
  cooldown: number = 1

  playerRef: Player

  constructor(_player: Player) {
    this.playerRef = _player
  }

  update(dt: number) {
    if (this.isActive) {
      if (this.elapsed < this.cooldown) {
        this.elapsed += dt
      } 
      else {
        if (this.playerRef.isOnDefaultParcel) {
          if (this.playerRef.ammo < this.playerRef.maxAmmo) {
            this.playerRef.ammo++
            log('AMMO: ' + this.playerRef.ammo + '/' + this.playerRef.maxAmmo)
            updateAmmo(this.playerRef.ammo, this.playerRef.maxAmmo)
          }
        }
        this.elapsed = 0
        triggerEmote({ predefined: PredefinedEmote.CRAFTING })
      }
    }
  }
}

export let player = new Player(teamColor.RED)

export class SnowballCooldownSystem {
  elapsed: number = 0
  cooldown: number = 0.75

  update(dt: number) {
    if (player.inCooldown) {
      //log("elapsed: " + cooldownInfo.elapsed)
      if (this.elapsed < this.cooldown) {
        this.elapsed += dt
        //cooldownInfo.inCooldown = true
      } else {
        // log("TIMESUP: " + cooldownInfo.elapsed)
        //log("elapsed: " + cooldownInfo.elapsed)
        this.elapsed = 0
        player.inCooldown = false
      }
    }
  }
}

engine.addSystem(new SnowballCooldownSystem())
