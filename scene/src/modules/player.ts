@Component("SelfCollider")
export class SelfCollider {     
}

class Player {
    id:number
    collider:Entity

    constructor(){
        this.collider = new Entity()
        
        this.collider.addComponent(new Transform({
            position: new Vector3(0,0,0)
        }))
        this.collider.addComponent(new GLTFShape('models/enemy.glb'))
        this.collider.addComponent(new SelfCollider())

        engine.addEntity(this.collider)

        this.collider.setParent(Attachable.AVATAR)
    }
}

export let player = new Player()