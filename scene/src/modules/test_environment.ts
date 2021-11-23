const sceneX = 12 * 16
const sceneZ = 12 * 16

const count = 100
let material = new Material()
material.albedoColor = Color4.Gray()
material.specularIntensity = 0
material.roughness = 1
material.metallic = 0

for(let i=0; i< count; i++){

    let sizeX = Math.random()*20
    let sizeZ = Math.random()*20
    let sizeY = Math.random()*30
    
    let box = new Entity()
    box.addComponent(new Transform({
            position: new Vector3(sizeX + Math.random() * (sceneX-2*sizeX), sizeY/2, sizeZ + Math.random() * (sceneZ - 2*sizeZ)),
            scale: new Vector3(sizeX, sizeY, sizeZ)
        }))
    box.addComponent(new BoxShape())
    box.addComponent(material)
    engine.addEntity(box)
}


const modArea = new Entity()

modArea.addComponent(
  new AvatarModifierArea({
    area: { box: new Vector3(sceneX - 1, 50, sceneX- 1)},
    modifiers: [AvatarModifiers.HIDE_AVATARS],
  })
)
modArea.addComponent(
  new Transform({
    position: new Vector3(sceneX/2, 0, sceneZ/2),
  })
)
engine.addEntity(modArea)