import { Room } from "node_modules/colyseus.js/lib/Room"
import { Ball, BallManager } from "./ball"
import { EnemyManager } from "./enemyManager"
import { teamColor } from "./teamColors"

@Component("SelfCollider")
export class SelfCollider {     
}

export class Player {
    id:number
    collider:Entity
    ballManager:BallManager
    enemyManager:EnemyManager
    cam:Camera 
    color:teamColor = teamColor.BLUE
    testDummy:Entity
    dummyAnimator:Animator
    clipThrow:AnimationState
    clipHit:AnimationState
    
    roomConnected:boolean = false
    room:Room

    constructor(){
        
        this.cam = Camera.instance
        this.collider = new Entity()        
        this.collider.addComponent(new Transform({
            position: new Vector3(0,0,0)
        }))
        this.collider.addComponent(new GLTFShape('models/enemy.glb')).isPointerBlocker = false
        this.collider.addComponent(new SelfCollider())

        engine.addEntity(this.collider)

        this.collider.setParent(Attachable.AVATAR)

        //animation testing
        this.testDummy = new Entity()
        this.testDummy.addComponent(new Transform({position: new Vector3(0,-1.0, 0)}))
        engine.addEntity(this.testDummy)
        this.testDummy.setParent(Attachable.AVATAR)
        this.testDummy.addComponent(new GLTFShape('models/snowball_anim.glb'))

        this.dummyAnimator = new Animator()
        this.clipThrow = new AnimationState("Snowball_Throw")
        this.clipHit = new AnimationState("Snowball_Hit")

        this.testDummy.addComponent( this.dummyAnimator)
        this.dummyAnimator.addClip(this.clipThrow)
        this.dummyAnimator.addClip(this.clipHit)

        this.clipHit.looping = false
        this.clipThrow.looping = false


        
        // this.sendDataSys = new SendPlayerDataSystem(this)
         //engine.addSystem(this.sendDataSys)
    }

    addBallManager(ballManager:BallManager){
        this.ballManager = ballManager
    }
    addEnemyManager(_enemyManager:EnemyManager){
        this.enemyManager = _enemyManager
    }

    setColor(_teamColor:number){
        switch(_teamColor){
            case teamColor.RED:{
                this.color = teamColor.RED
                break
            }
            case teamColor.BLUE:{
                this.color = teamColor.BLUE
                break
            }
        }
    }
    setRoom(_room:Room){
        this.room = _room
        this.roomConnected = true
    }
    getHorizontalRotation():Quaternion{        
        return Quaternion.FromToRotation(Vector3.Forward(), Vector3.Forward().rotate(this.cam.rotation).multiplyByFloats(1,0,1))
    }
}

export let player = new Player()



