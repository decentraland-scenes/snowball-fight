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
