import { Ball, BallManager } from "./ball"
import { teamColor } from "./teamColors"

@Component("OtherCollider")
export class OtherCollider {
    color:teamColor  
    
    constructor(_color:teamColor){
        this.color = _color
    }
    
}

export class OtherPlayer {
    id:string
    collider:Entity
    //ballManager:BallManager
    cam:Camera 
    color:teamColor = teamColor.BLUE
    material:Material
    testDummy:Entity
    dummyAnimator:Animator
    clipThrow:AnimationState
    clipHit:AnimationState

    constructor(id:string, color:teamColor){

        this.id = id
        this.material = new Material()
        this.collider = new Entity()  

        switch(color){
            case teamColor.BLUE:{
                this.material.albedoColor = Color4.Blue()
                this.collider.addComponent(new OtherCollider(teamColor.BLUE))
                break
            }
            case teamColor.RED: {
                this.material.albedoColor = Color4.Red()
                this.collider.addComponent(new OtherCollider(teamColor.RED))
                break
            }
            default : {
                this.material.albedoColor = Color4.Blue()
                this.collider.addComponent(new OtherCollider(teamColor.BLUE))
                teamColor.BLUE
            }
        }
        
        

              
        this.collider.addComponent(new Transform({
            position: new Vector3(0,0,0)
        }))
        this.collider.addComponent(new GLTFShape('models/enemy.glb')).isPointerBlocker = true
       // this.collider.addComponent(new BoxShape())
       // this.collider.addComponent(new GLTFShape('models/snowball_anim.glb'))
        
        this.collider.addComponent(this.material)

        engine.addEntity(this.collider)

        //animation testing
        this.testDummy = new Entity()
        this.testDummy.addComponent(new Transform({position: new Vector3(0,-1.8, 0)}))
        engine.addEntity(this.testDummy)
        this.testDummy.setParent(this.collider)        
        this.testDummy.addComponent(new GLTFShape('models/snowball_anim.glb'))

        this.dummyAnimator = new Animator()
        this.clipThrow = new AnimationState("Snowball_Throw")
        this.clipHit = new AnimationState("Snowball_Hit")

        this.testDummy.addComponent( this.dummyAnimator)
        this.dummyAnimator.addClip(this.clipThrow)
        this.dummyAnimator.addClip(this.clipHit)

        this.clipHit.looping = false
        this.clipThrow.looping = false

        //TODO attach to others in scene
        //this.collider.setParent(Attachable.AVATAR)
    }

    // addBallManager(ballManager:BallManager){
    //     this.ballManager = ballManager
    // }

    setColor(_teamColor:number){
        switch(_teamColor){
            case teamColor.RED:{
                this.color = teamColor.RED
                this.material.albedoColor = Color4.Red()
                this.collider.getComponent(OtherCollider).color = teamColor.RED
                break
            }
            case teamColor.BLUE:{
                this.color = teamColor.BLUE
                this.material.albedoColor = Color4.Blue()
                this.collider.getComponent(OtherCollider).color = teamColor.BLUE
                break
            }
        }
    }
    updatePos(posX:number, posY:number, posZ:number, rotX:number, rotY:number, rotZ:number, rotW:number){
        const transform = this.collider.getComponent(Transform)
        transform.position.set(posX, posY, posZ)
        transform.rotation.set(rotX, rotY, rotZ, rotW)
    }
}


