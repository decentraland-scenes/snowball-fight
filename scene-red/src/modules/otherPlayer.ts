import { Ball, BallManager } from "./ball"
import { teamColor } from "./teamColors"

@Component("OtherCollider")
export class OtherCollider {
    color:teamColor  
    id:string
    
    constructor( _id:string){
        this.color = teamColor.BLUE
        this.id = _id
    }
    
}

export class OtherPlayer {
    id:string
    collider:Entity
    //ballManager:BallManager
    //:Camera 
    color:teamColor = teamColor.BLUE
    material:Material    
    targetTransform:Transform

    constructor(id:string){

        this.id = id
        this.material = new Material()
        this.collider = new Entity()  
        this.collider.addComponent(new Transform({
            position: new Vector3(0,0,0)
        }))

        this.targetTransform = new Transform()

        // switch(color){
        //     case teamColor.BLUE:{
        //         this.material.albedoColor = Color4.Blue()
        //         this.collider.addComponent(new OtherCollider(teamColor.BLUE, this.id))
        //         this.collider.addComponent(new GLTFShape('models/enemy_blue.glb')).isPointerBlocker = true
        //         break
        //     }
        //     case teamColor.RED: {
        //         this.material.albedoColor = Color4.Red()
        //         this.collider.addComponent(new OtherCollider(teamColor.RED, this.id))
        //         this.collider.addComponent(new GLTFShape('models/enemy_red.glb')).isPointerBlocker = true
        //         break
        //     }
            
        // }
        
        

              
       
        
       // this.collider.addComponent(new BoxShape())
       // this.collider.addComponent(new GLTFShape('models/snowball_anim.glb'))
        
        //this.collider.addComponent(this.material)
        this.collider.addComponent(new GLTFShape('models/enemy_general.glb')).isPointerBlocker = true
        this.collider.addComponent(new OtherCollider(this.id))
        engine.addEntity(this.collider)

        //animation testing
       

        //TODO attach to others in scene
        //this.collider.setParent(Attachable.AVATAR)
    }

    // addBallManager(ballManager:BallManager){
    //     this.ballManager = ballManager
    // }

    setColor(_teamColor:number){
        switch(_teamColor){
            case 1:{
                this.color = teamColor.RED
                this.material.albedoColor = Color4.Red()
                this.collider.getComponent(OtherCollider).color = teamColor.RED
                this.collider.addComponentOrReplace(new GLTFShape('models/enemy_red.glb')).isPointerBlocker = true
                break
            }
            case 0:{
                this.color = teamColor.BLUE
                this.material.albedoColor = Color4.Blue()
                this.collider.getComponent(OtherCollider).color = teamColor.BLUE
                this.collider.addComponentOrReplace(new GLTFShape('models/enemy_blue.glb')).isPointerBlocker = true
                break
            }
        }
    }
    updatePos(posX:number, posY:number, posZ:number, rotX:number, rotY:number, rotZ:number, rotW:number){
        // const transform = this.collider.getComponent(Transform)

        // this.targetTransform.position.set(posX, posY, posZ)
        // this.targetTransform.rotation.set(rotX, rotY, rotZ, rotW)
       // transform.position.set(posX, posY, posZ)
      //  transform.rotation.set(rotX, rotY, rotZ, rotW)
    }
}


