// import { world, worldNoGravity } from "./physics/world"





// // Setup ground material
// const physicsMaterial = new CANNON.Material("groundMaterial")
// const ballContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, { friction: 1, restitution: 0.65})
// world.addContactMaterial(ballContactMaterial)

// //loadColliders(world, physicsMaterial)
// // Create a ground plane and apply physics material
// const groundShape: CANNON.Plane = new CANNON.Plane()
// const groundBody: CANNON.Body = new CANNON.Body({ mass: 0 })
// groundBody.addShape(groundShape)
// groundBody.material = physicsMaterial
// groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis
// groundBody.position.set(0, 0.05, 0)
// world.addBody(groundBody) // Add ground body to world


// const THROW_STRENGTH_MULTIPLIER = 0.125

// export class PhysicsBallCollider extends Entity {
//   public isActive: boolean = false
//   public isThrown: boolean = true
//   public body: CANNON.Body
//   public bodyColliderNoGravity: CANNON.Body
//   public world: CANNON.World
//   public worldNoGravity: CANNON.World
//   public glowEntity = new Entity()
//   public kickDistance: number = 40
//   public kickable: boolean = true
//   ballHighlight:Entity
//   bounceAudio:AudioSource
  

//   constructor(transform: Transform, cannonMaterial: CANNON.Material, cannonWorldNoGravity: CANNON.World) {
//     super()
//     engine.addEntity(this)    
//     this.addComponent(transform)    
//     this.worldNoGravity = cannonWorldNoGravity      

//     this.bodyColliderNoGravity = new CANNON.Body({
//       mass: 1, // kg
//       position: new CANNON.Vec3(transform.position.x, transform.position.y, transform.position.z), // m
//       shape: new CANNON.Sphere(0.3), // Create sphere shaped body with a diameter of 0.22m
//     })

//     // Add material and dampening to stop the ball rotating and moving continuously
//     //this.body.sleep()
//     this.bodyColliderNoGravity.material = cannonMaterial
//     this.worldNoGravity.addBody(this.bodyColliderNoGravity) // Add ball body to the world

//     // Ball collision
//     this.bodyColliderNoGravity.addEventListener("collide", (e) => {


//       //log("physics COLLIDED at: " + this.getPos())

//       let contact = e.contact
      
//        // log("collided ball")
//      // let randomTrackNo = Math.floor(Math.random() * 2)
//       //hitSounds[randomTrackNo].playAudioOnceAtPosition(this.getComponent(Transform).position)
//     })
//     //sounds
//     //this.bounceAudio = mySounds.sourceBounce
//     //this.addComponent(this.bounceAudio)

//   }
//   getPos():Vector3{
//       return this.getComponent(Transform).position
//   }
//   setPos(_pos:Vector3){
//       this.getComponent(Transform).position.copyFrom(_pos)
//   }


// }

// // Create balls
// // export const physicsBall = new PhysicsBallCollider(
// //     new Transform({ 
// //         position: new Vector3(8, 8, 8), 
// //         scale: new Vector3( 0.75, 0.75, 0.75) 
// //     }), 
// //     physicsMaterial,     
// //     worldNoGravity
// //     )




// // const balls: PhysicsBallCollider[] = [physicsBall]

// // // Set high to prevent tunnelling
// // const FIXED_TIME_STEPS = 1.0 / 60
// // const MAX_TIME_STEPS = 10

// // class PhysicsSystem implements ISystem {
// //   update(dt: number): void {
// //     world.step(FIXED_TIME_STEPS, dt, MAX_TIME_STEPS)

// //     for (let i = 0; i < balls.length; i++) {
// //       if (!balls[i].isActive) {

// //         //update projectile colldier sphere in noGravity world
// //         balls[i].bodyColliderNoGravity.position.copy(balls[i].body.position)
// //         balls[i].bodyColliderNoGravity.quaternion.copy(balls[i].body.quaternion)

// //       }      
// //     }    
// //   }
// // }
// // engine.addSystem(new PhysicsSystem())

