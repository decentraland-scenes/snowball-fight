import { getCurrentRealm } from '@decentraland/EnvironmentAPI'
import { Cone, cubeColor } from './cones'
import { connect } from './connection'
import { Cube, cubes } from './cube'

connect('my_room').then((room)=>{

  // add cubes
  for (let i = 0; i < 8; i++) {
    let cube = new Cube(
      {
        position: new Vector3(i * 2 + 1, 1, 4),
      }, i, room
    )
  }


  // add cones
  let blueCone = new Cone(
    {position: new Vector3(6, 1, 14)},
    cubeColor.BLUE,
    room
  )

  let redCone = new Cone(
    {position: new Vector3(10, 1, 14)},
    cubeColor.RED,
    room
  )

  room.onMessage("flashColor", (data)=>{
    if(data.color == cubeColor.BLUE){
      blueCone.activate()
    } else {
      redCone.activate()
    }
  })

  room.state.cubes.onAdd = (cubeData) => {
    log('Added cube => ', cubeData.id)
    cubeData.listen('color', (value) => {
    
      cubes[cubeData.id].activate(value)
      
    })
  }

})




// ground
let floor = new Entity()
floor.addComponent(new GLTFShape('models/FloorBaseGrass.glb'))
floor.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(1.6, 0.1, 1.6),
  })
)
engine.addEntity(floor)



