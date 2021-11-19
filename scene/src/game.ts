import { getCurrentRealm } from '@decentraland/EnvironmentAPI'
import { Cone, cubeColor } from './cones'
import { teamColor } from './modules/teamColors'
import { connect } from './connection'
import { Cube, cubes } from './cube'
import { BallManager } from './modules/ball'
import { player } from './modules/player'

connect('my_room').then((room)=>{

  player.addBallManager(new BallManager(100, room))

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
    teamColor.BLUE,
    room
  )

  let redCone = new Cone(
    {position: new Vector3(10, 1, 14)},
    teamColor.RED,
    room
  )

  room.onMessage("flashColor", (data)=>{

    switch(data.teamColor){
      case teamColor.BLUE:{
        log("SERVER BLUE")
        blueCone.activate()
        break
      }
      case 1:{
        log("SERVER RED")
        redCone.activate()
      }
    }    

  })

  room.onMessage("throwBall", (data)=>{    
    //log("serverPos: " + data.pos.x + ",  " + data.pos.y + ", " + data.pos.z )
    //log("serverDir: " + data.dir.x + ",  " + data.dir.y + ", " + data.dir.z )
   // log("serverFor: " + data.force)
    player.ballManager.spawnBall(data.teamColor).throwBallOther(
      new Vector3(data.pos.x, data.pos.y, data.pos.z), 
      new Vector3(data.dir.x, data.dir.y, data.dir.z),
      data.force      
      )
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



