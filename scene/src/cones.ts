import * as utils from '@dcl/ecs-scene-utils'
import { Room } from 'colyseus.js'
import { player } from './modules/player'

export enum cubeColor {
    NEUTRAL,
    BLUE,
    RED
  }
export enum teamColor {    
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
    color: teamColor = teamColor.BLUE
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

                this.room.send("pickColor", {color: this.color, teamColor:this.color})
                player.setColor(this.color)
                // this.activate()
            },
            { button: ActionButton.PRIMARY, hoverText: 'Pick ' +this.color + ' with E' }
          )
        )
        if(this.color == teamColor.RED){
            this.addComponent(lightRedMaterial)
        } else {
            this.addComponent(lightBlueMaterial)
        }

        engine.addEntity(this) 
    }

    activate(){
       if(this.color == teamColor.RED){
           log("RED ACTIVATED")
            this.addComponentOrReplace(redMaterial)
            utils.setTimeout(1000, ()=>{
                this.addComponentOrReplace(lightRedMaterial)
            })
        }else if(this.color == teamColor.BLUE){
            log("BLUE ACTIVATED")
            this.addComponentOrReplace(blueMaterial)
            utils.setTimeout(1000, ()=>{
                this.addComponentOrReplace(lightBlueMaterial)
            })
        }
    }
}

