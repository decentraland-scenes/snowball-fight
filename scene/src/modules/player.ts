import { Ball, BallManager } from "./ball"
import { teamColor } from "./teamColors"

@Component("SelfCollider")
export class SelfCollider {     
}

class Player {
    id:number
    collider:Entity
    ballManager:BallManager
    cam:Camera 
    color:teamColor = teamColor.BLUE

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
    }

    addBallManager(ballManager:BallManager){
        this.ballManager = ballManager
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
}

export let player = new Player()

