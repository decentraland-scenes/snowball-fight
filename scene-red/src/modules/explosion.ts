import * as mySounds from "./sounds"

@Component("ExplosionInfo")
export class ExplosionInfo { 

    explosion:Explosion
    confetti:Entity    
    lifetime:number = 1
    force:number = 200

    constructor(_lifeTime:number, _explosionRef:Explosion){
        this.lifetime = _lifeTime
        this.explosion = _explosionRef        
    }  
}

@Component("SplatTimeout")
export class SplatTimeout { 

    splat:Entity    
    lifetime:number = 5   

    constructor(_lifeTime:number, _splatRef:Entity){
        this.lifetime = _lifeTime
        this.splat = _splatRef        
    }  
}

export class Explosion extends Entity{

    smoke:Entity
    explosionSound:AudioSource
  
    constructor(_position:Vector3, _rotation:Quaternion){
      super()
      this.addComponent(new Transform({
        position: new Vector3(_position.x, _position.y, _position.z),
        rotation: _rotation,
        scale: new Vector3(0.5, 0.5, 0.5)
      }))
      this.addComponent(new GLTFShape('models/explosion.glb'))
      this.addComponent(new ExplosionInfo(13/30, this))
  
    //   this.smoke = new Entity()
    //   this.smoke.addComponent(new Transform())
    //   this.smoke.setParent(this)
    //   this.smoke.addComponent(new GLTFShape('models/explosion_smoke.glb'))
      
      this.explosionSound = new AudioSource(mySounds.clipHit)
      this.explosionSound.volume = 6
      this.addComponent(this.explosionSound)
      this.explosionSound.playOnce()
  
      engine.addEntity(this)
     // log("exploded: " + this.getComponent(Transform).position)
  
      //spawn a crater on the ground
      
        splatSpawner.spawnEntity(_position, _rotation)
          
      
    }
  }

  export const splatSpawner = {
    MAX_POOL_SIZE: 20,
    pool: [] as Entity[],
  
    spawnEntity(_position:Vector3, _rotation:Quaternion) {
      // Get an entity from the pool
      const splat = splatSpawner.getEntityFromPool()
  
      if (!splat) return
  
      // leave a crater on the ground level
   
      
      splat.addComponentOrReplace(new Transform({
        position: new Vector3(_position.x, _position.y, _position.z, ),
       // rotation: Quaternion.Euler(0, Math.random()*360, 0),
        rotation: _rotation,
        scale: new Vector3(2,1,2)
      }))
      splat.addComponentOrReplace(new GLTFShape('models/splat.glb'))        
      splat.addComponentOrReplace(new SplatTimeout(5, splat))        
  
      //add entity to engine
      engine.addEntity(splat)
    },
  
    getEntityFromPool(): Entity | null {
      // If none of the existing are available, create a new one, unless the maximum pool size is reached
      if (splatSpawner.pool.length < splatSpawner.MAX_POOL_SIZE) {
        const instance = new Entity()
        splatSpawner.pool.push(instance)
        return instance
      }
      else{
        let instance = splatSpawner.pool.shift()
        splatSpawner.pool.push(instance)
        return instance
      }
      return null
    },
  }

  class ExplosionSystem {

    
    explosionGroup = engine.getComponentGroup(ExplosionInfo,Transform)    
    splatGroup = engine.getComponentGroup(SplatTimeout,Transform)    

    update(dt: number) {         
        
        //hit explosions
        for (let explosion of this.explosionGroup.entities) 
        {
            let transform = explosion.getComponent(Transform)     
            let eInfo = explosion.getComponent(ExplosionInfo)   


            if(eInfo.lifetime > 0){  
                eInfo.lifetime -= dt             
            }
            else{
                
                engine.removeEntity(explosion)
            }
        }

        //splat decals
        for (let splat of this.splatGroup.entities) 
        {
           
            let transform = splat.getComponent(Transform)     
            let sInfo = splat.getComponent(SplatTimeout)   

            if(sInfo.lifetime > 0){  
                sInfo.lifetime -= dt             
            }
            else{  
                            
                transform.scale.setAll(0)
            }
        }
    }
}  
engine.addSystem(new ExplosionSystem())   