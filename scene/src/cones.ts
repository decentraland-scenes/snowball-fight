import * as utils from '@dcl/ecs-scene-utils'
import { Room } from 'colyseus.js'

export enum cubeColor {
    NEUTRAL,
    BLUE,
    RED
  }

// reusable materials
export let redMaterial = new Material()
redMaterial.albedoColor = Color3.Red()
redMaterial.roughness = 1
redMaterial.emissiveColor = Color3.Red()

export let lightRedMaterial = new Material()
lightRedMaterial.albedoColor = Color3.FromHexString('#ff6054')
lightRedMaterial.roughness = 1

export let blueMaterial = new Material()
blueMaterial.albedoColor = Color3.Blue()
blueMaterial.roughness = 1
blueMaterial.emissiveColor = Color3.Blue()

export let lightBlueMaterial = new Material()
lightBlueMaterial.albedoColor = Color3.FromHexString('#5e6eff')
lightBlueMaterial.roughness = 1


export class Cone extends Entity{
    color: cubeColor = cubeColor.NEUTRAL
    room: Room
    constructor(position: TranformConstructorArgs, color, room){

       super()
       this.color = color
       this.room = room

        this.addComponent(
          new Transform(position)
        )
        this.addComponent(new ConeShape())
        this.addComponent(
          new OnPointerDown(
            (e) => {
                this.room.send("pickColor", {color: this.color})
                // this.activate()
            },
            { button: ActionButton.POINTER, hoverText: 'Pick color' }
          )
        )
        if(this.color == cubeColor.RED){
            this.addComponent(lightRedMaterial)
        } else {
            this.addComponent(lightBlueMaterial)
        }

        engine.addEntity(this) 
    }

    activate(){
       if(this.color == cubeColor.RED){
            this.addComponentOrReplace(redMaterial)
            utils.setTimeout(1000, ()=>{
                this.addComponentOrReplace(lightRedMaterial)
            })
        }else if(this.color == cubeColor.BLUE){
            this.addComponentOrReplace(blueMaterial)
            utils.setTimeout(1000, ()=>{
                this.addComponentOrReplace(lightBlueMaterial)
            })
        }
    }
}

