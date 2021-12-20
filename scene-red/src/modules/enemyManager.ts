import { teamColor } from "src/cones";
import { OtherPlayer } from "./otherPlayer";

export class EnemyManager {
    others:OtherPlayer[]
    
    constructor(){
        this.others = []
    }

    addEnemy(id:string, color:teamColor){
        let enemy = new OtherPlayer(id, color)
        this.others.push(enemy)
    }
    removeEnemy(id:string){
        let enemy = this.getEnemyByID(id)

        const index = this.others.indexOf(enemy, 0);
                if (index > -1) {
                    this.others.splice(index, 1);
                    engine.removeEntity(enemy.collider)
                }
    }
    getEnemyByID(_id:string):OtherPlayer{
        let result = this.others.filter(x => x.id === _id)[0]
       
        return result
    }
    updatePlayerPos(_id:string, posX:number, posY:number, posZ:number, rotX:number, rotY:number, rotZ:number, rotW:number){

        let enemy = this.getEnemyByID(_id)
        if(enemy != null){
            enemy.updatePos(posX, posY, posZ, rotX, rotY, rotZ, rotW)
        }
        
    }

    
}

export class EnemyUpdateSystem {
    enemyManagerRef:EnemyManager

    constructor(EnemyManagerRef:EnemyManager){
        this.enemyManagerRef = EnemyManagerRef
    }

    update(dt:number){
        for(let enemy of this.enemyManagerRef.others){
            const transform = enemy.collider.getComponent(Transform)

            transform.position = Vector3.Lerp(transform.position, enemy.targetTransform.position, 3 *dt)
            transform.rotation = Quaternion.Slerp(transform.rotation, enemy.targetTransform.rotation, 3*dt)
        }
    }
}