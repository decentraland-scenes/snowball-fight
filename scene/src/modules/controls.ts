//import { physicsBall } from "./physicsBall"
import { BallManager } from "./ball"
import { triggerEmote, PredefinedEmote } from "@decentraland/RestrictedActions"

let player = Camera.instance
const ballManager = new BallManager(100)

let offsetVecOriginal = new Vector3(0.6, 0.0, 0)
let offsetVec = new Vector3(0.6, 0.0, 0)
let throwDirOriginal = new Vector3(0, 0.1, 1)
let throwDir = new Vector3(0, 0.1, 1)
const input = Input.instance

// SHOOT
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, true, e => {
        offsetVec.copyFrom(offsetVecOriginal) 
        throwDir.copyFrom(throwDirOriginal)
        ballManager.spawnBall().throwBallPlayer(player.position.add(offsetVec.rotate(player.rotation)),throwDir.rotate(player.rotation),1)
        //ball.moveVector.copyFrom(throwDir.rotate(player.rotation))  
       // physicsBall.playerThrow(player.position.add(offsetVec.rotate(player.rotation)),throwDir.rotate(player.rotation), 200)
        //triggerEmote({ predefined: PredefinedEmote.SHRUG })
})

let dummyEnemy = new Entity()
dummyEnemy.addComponent(new Transform({
    position: new Vector3(32,0,32)
}))
dummyEnemy.addComponent(new GLTFShape('models/enemy.glb'))

engine.addEntity(dummyEnemy)
class DummyEnemySystem {

    direction = new Vector3(0,0.2,-1)    
   cooldown:number = 2

    update(dt: number) { 
        if(this.cooldown > 0){
            this.cooldown -= dt
        }
        else{
                ballManager.spawnBall().throwBallOther(dummyEnemy.getComponent(Transform).position.add(Vector3.Up()), this.direction,1)
                this.cooldown = 2
        }
    }
}

engine.addSystem(new DummyEnemySystem())
