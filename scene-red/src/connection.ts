//
// IMPORTANT :
// - include `noLib: false` to your tsconfig.json file, under "compilerOptions"
//
///<reference lib="es2015.symbol" />
///<reference lib="es2015.symbol.wellknown" />
///<reference lib="es2015.collection" />
///<reference lib="es2015.iterable" />

import { Client, Room } from 'colyseus.js'
import { isPreviewMode, getCurrentRealm } from '@decentraland/EnvironmentAPI'
import { getUserData } from '@decentraland/Identity'
import * as ui from '@dcl/ui-scene-utils'
import { teamColor } from './modules/teamColors'
import { setServerStatusUI } from './modules/ui'

export let room: Room | undefined = undefined

export async function connect(roomName: string, options: any = {}) {
  disconnect()

  const isPreview = await isPreviewMode()
  //const isPreview = true
  const realm = await getCurrentRealm()

  //
  //CHANGE THIS FOR EACH SIDE'S WEARABLES
  //
  options.color = teamColor.RED

  //   if (!realm?.room) return
  //
  // make sure users are matched together by the same "realm".
  //
  options.realm = realm ? realm.displayName + `-` + realm.room : null
  options.userData = await getUserData()

  log('REALM DATA:', realm)

  log('USER DATA:', options.userData)

    // const ENDPOINT = 'wss:xggtls.colyseus.dev'
    const ENDPOINT = isPreview
      ? 'ws://127.0.0.1:2567' // local environment
      : 'wss:xggtls.colyseus.dev' // production environment

  addConnectionDebugger(ENDPOINT, isPreview)

  const client = new Client(ENDPOINT)

  try {
    if (room) {
      room.leave()
    }

    //
    // Docs: https://docs.colyseus.io/client/client/#joinorcreate-roomname-string-options-any
    //
    room = await client.joinOrCreate<any>(roomName, options)

    // if (isPreview) {
    updateConnectionDebugger(room, isPreview)
    // }

    log('Connected!')
    // onConnect(room)

    return room
  } catch (e: any) {
    if (isPreview) {
      updateConnectionMessage(`Error: ${e.message}`, Color4.Red())
    } else {
      updateConnectionMessage(
        '-- Snowball fight outfit offline -- \n Try taking it off and putting it back on again',
        Color4.Red()
      )
    }
    throw e
  }
}

let message: UIText = new UIText(ui.canvas)

function addConnectionDebugger(endpoint: string, isPreview: boolean) {
  message.fontSize = 15
  message.width = 120
  message.height = 30
  message.hTextAlign = 'center'
  message.vAlign = 'bottom'
  message.positionX = -80
  //setServerStatusUI(`Connecting to ${endpoint}`, Color4.Green())

  if (isPreview) {
    updateConnectionMessage(`Connecting to ${endpoint}`, Color4.White())
  }
}

function updateConnectionMessage(value: string, color: Color4) {
  message.visible = true
  message.value = value
  message.color = color
}

function updateConnectionDebugger(room: Room, isPreview?: boolean) {
  if (isPreview) {
    updateConnectionMessage('Connected.', Color4.Green())
  } else {
    message.visible = false
  }
  room.onLeave(() =>
    updateConnectionMessage(
      '-- Xmas Vision glasses offline -- \n Try taking them off and putting them back on again',
      Color4.Red()
    )
  )
}

export function disconnect() {
  if (room !== undefined) {
    room.removeAllListeners()
    room.leave()
  }
}

// //
// // IMPORTANT :
// // - include `noLib: false` to your tsconfig.json file, under "compilerOptions"
// //
// ///<reference lib="es2015.symbol" />
// ///<reference lib="es2015.symbol.wellknown" />
// ///<reference lib="es2015.collection" />
// ///<reference lib="es2015.iterable" />

// import { Client, Room } from 'colyseus.js'
// import { isPreviewMode, getCurrentRealm } from '@decentraland/EnvironmentAPI'
// import { getUserData, UserData } from '@decentraland/Identity'
// import { teamColor } from './modules/teamColors'
// import { setServerStatusUI } from './modules/ui'

// export let userData: UserData | null

// export async function setUserData() {
//   userData = await getUserData()
// }

// export async function connect(roomName: string, options: any = {}) {
//   const isPreview = await isPreviewMode()
//   const realm = await getCurrentRealm()

//   //
//   //CHANGE THIS FOR EACH SIDE'S WEARABLES
//   //
//   options.color = teamColor.BLUE

//   //
//   // make sure users are matched together by the same "realm".
//   //
//   if (isPreview) {
//     options.realm = 'test'
//   } else {
//     options.realm = realm?.displayName
//   }

//   if (!userData) {
//     await setUserData()
//   }
//   options.userData = userData

//   log('data sent:', options)

//   // const ENDPOINT = "wss://hept-j.colyseus.dev";
//   const ENDPOINT = isPreview
//     ? 'ws://127.0.0.1:2567' // local environment
//     : 'wss://l9tio3.colyseus.dev' // production environment

//   if (isPreview) {
//     addConnectionDebugger(ENDPOINT)
//   }
//   const client = new Client(ENDPOINT)

//   try {
//     //
//     // Docs: https://docs.colyseus.io/client/client/#joinorcreate-roomname-string-options-any
//     //
//     const room = await client.joinOrCreate<any>(roomName, options)
//     if (isPreview) {
//       updateConnectionDebugger(room)
//     }

//     return room
//   } catch (e) {
//     //updateConnectionMessage(`Error: ${e.message}`, Color4.Red())
//     setServerStatusUI(`Connecting to ${e.message}`, Color4.Red())

//     throw e
//   }
// }

// let message: UIText

// function addConnectionDebugger(endpoint: string) {
//   const canvas = new UICanvas()
//   message = new UIText(canvas)
//   message.fontSize = 15
//   message.width = 120
//   message.height = 30
//   message.hTextAlign = 'center'
//   message.vAlign = 'bottom'
//   message.positionX = -80
//   updateConnectionMessage(`Connecting to ${endpoint}`, Color4.White())
//   setServerStatusUI(`Connecting to ${endpoint}`, Color4.Green())
// }

// function updateConnectionMessage(value: string, color: Color4) {
//   message.value = value
//   message.color = color
// }

// function updateConnectionDebugger(room: Room) {
//   updateConnectionMessage('Connected.', Color4.Green())
//   setServerStatusUI(' CONNECTED', Color4.Green())
//   room.onLeave(() => updateConnectionMessage('Connection lost', Color4.Red()))
// }
