import * as utils from '@dcl/ecs-scene-utils'
import { Room } from 'colyseus.js'
import { blueMaterial, cubeColor, lightBlueMaterial, lightRedMaterial, redMaterial } from './cones'


// list of all cubes
export let cubes: Cube[] = []


  
export class Cube extends Entity{
    id: number
    room: Room
    constructor(position: TranformConstructorArgs, id: number, room: Room){

        super()
        this.room = room
        this.id = id
        this.addComponent(
        new Transform(position)
        )
        this.addComponent(new BoxShape())
        this.addComponent(
        new OnPointerDown(
            (e) => {
            this.room.send("setColor", {id: this.id})
            },
            { button: ActionButton.POINTER, hoverText: 'Activate' }
        )
        )
        engine.addEntity(this)

        cubes.push(this)

    }

    activate(color: cubeColor){

        if(this.hasComponent(utils.Delay)){
            this.removeComponent(utils.Delay)
        }

        if(color == cubeColor.NEUTRAL){
            this.removeComponent(Material)
        } else if(color == cubeColor.RED){
            this.addComponentOrReplace(redMaterial)
            this.addComponentOrReplace(new utils.Delay(1000,()=>{
                this.addComponentOrReplace(lightRedMaterial)
            } ))
           
        }else if(color == cubeColor.BLUE){
            this.addComponentOrReplace(blueMaterial)
            this.addComponentOrReplace(new utils.Delay(1000,()=>{
                this.addComponentOrReplace(lightBlueMaterial)
            } ))
        }
    }
}

