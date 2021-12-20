import { getCurrentRealm, isPreviewMode } from '@decentraland/EnvironmentAPI'
import { connect } from './connection'
import { onConnect } from './onConnect'
import { Room } from 'colyseus.js'

export class ConnectSystem implements ISystem {
  connected: boolean = false
  ticker: number = 0
  interval: number = 1
  isPreview: boolean = false
  checking: boolean = false
  async update(dt: number) {
    if (this.connected || this.checking) return
    this.ticker += dt
    if (this.ticker >= this.interval) {
      this.checking = true
      const realm = await getCurrentRealm()
      if (!realm || (!this.isPreview && !realm.room)) {
        log('no room yet!')
        this.ticker = 0
        this.checking = false
        return false
      } else {
        this.connected = true
        this.checking = false
        currentRealm = realm.displayName
        currentRoom = realm.room
        log('CONNECTING TO WS SERVER')
        await connect('my_room').then(async (room: Room) => {
          onConnect(room)
        })
        engine.removeSystem(this)
      }
    }
  }
  constructor() {
    this.getPreviewMode()
  }
  async getPreviewMode() {
    this.isPreview = await isPreviewMode()
  }
}

let myConnectSystem = new ConnectSystem()
engine.addSystem(myConnectSystem)

let currentRealm: string | null = null
let currentRoom: string | null = null

onRealmChangedObservable.add(async (realmData) => {
  if (realmData && realmData.room) {
    if (
      realmData.displayName === currentRealm &&
      realmData.room === currentRoom
    ) {
      log('SAME ISLAND AS BEFORE')
      return
    }
    log('PLAYER CHANGED ISLAND TO ', realmData.room)
    myConnectSystem.connected = true
    log('CONNECTING TO WS SERVER')
    await connect('my_room').then(async (room: Room) => {
      onConnect(room)
    })
  }
})

// // ground
// let floor = new Entity()
// floor.addComponent(new GLTFShape('models/FloorBaseGrass.glb'))
// floor.addComponent(
//   new Transform({
//     position: new Vector3(23*16/2, 0, 23*16/2),
//     scale: new Vector3(24, 0.1, 24),
//   })
// )
// engine.addEntity(floor)
