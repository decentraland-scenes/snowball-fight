

 let kickForceTexture = new Texture('textures/kickforce_texture.png', {samplingMode: 1, wrap: 0})
// let uiAtlasTexture = new Texture('textures/ui_atlas.png', {samplingMode: 1})

export const canvas = new UICanvas()



// TOP EDGE - SCORES CONTAINER
let TopScoresContainer = new UIContainerRect(canvas)
TopScoresContainer.height = '8%'
TopScoresContainer.hAlign = 'center'
TopScoresContainer.vAlign = 'top'
TopScoresContainer.width = "30%"
TopScoresContainer.positionY = "5%"



export let MatchTimeContainer = new UIContainerRect(TopScoresContainer)
    MatchTimeContainer.visible = true
    MatchTimeContainer.height = 24    
    MatchTimeContainer.hAlign = 'center'
    MatchTimeContainer.vAlign = 'bottom'
    MatchTimeContainer.width = '16%'
    MatchTimeContainer.positionY = 20
    MatchTimeContainer.color = Color4.FromHexString(`#00000088`)

export let MatchTimerMessage = new UIText(MatchTimeContainer)

    MatchTimerMessage.value = '00:00'
    MatchTimerMessage.fontSize = 16
    MatchTimerMessage.width = '100%'
    MatchTimerMessage.vAlign = 'center'
    MatchTimerMessage.hAlign = 'center'
    MatchTimerMessage.hTextAlign = 'center'
    MatchTimerMessage.vTextAlign = 'center'
    MatchTimerMessage.positionY = -2
    MatchTimerMessage.textWrapping = true

export function updateGameTime(_timeInSeconds:number){

    let minutes = Math.floor(Math.floor(_timeInSeconds)/60)
    let seconds = Math.floor(Math.floor(_timeInSeconds)%60)
    let secondsString = seconds.toString()

                if (seconds < 10){
                    secondsString = ("0" + seconds )                 
                }                
                if (_timeInSeconds > 10){
                    secondsString = seconds.toString()  
                    MatchTimerMessage.color = Color4.White()                  
                }                
                if (_timeInSeconds < 10){                     
                    MatchTimerMessage.color = Color4.Yellow()                  
                }                
                if(_timeInSeconds < 5){                   
                    MatchTimerMessage.color = Color4.FromHexString("#ff4a35ff")
                    MatchTimerMessage.fontSize = 20
                }

                
                MatchTimerMessage.value = ("0" + minutes + ":" + secondsString)
                
}


// TOP EDGE - SCORES

export let TopSnow2 = new UIContainerRect(TopScoresContainer)
TopSnow2.visible = true
TopSnow2.height = '75%'    
TopSnow2.hAlign = 'center'
TopSnow2.vAlign = 'center'
TopSnow2.width = '40%'
TopSnow2.positionY = 40
TopSnow2.color = Color4.FromHexString(`#ffffffff`)

export let TopSnow = new UIContainerRect(TopScoresContainer)
TopSnow.visible = true
TopSnow.height = '75%'    
TopSnow.hAlign = 'center'
TopSnow.vAlign = 'center'
TopSnow.width = '40%'
TopSnow.positionY = 34
TopSnow.color = Color4.FromHexString(`#ccccccff`)



export let MatchScoreContainer = new UIContainerRect(TopScoresContainer)
MatchScoreContainer.visible = true
MatchScoreContainer.height = '75%'    
MatchScoreContainer.hAlign = 'center'
MatchScoreContainer.vAlign = 'center'
MatchScoreContainer.width = '40%'
MatchScoreContainer.positionY = 32
MatchScoreContainer.color = Color4.FromHexString(`#000000ff`)

export let ScoreBGRed = new UIContainerRect(MatchScoreContainer)
ScoreBGRed.visible = true
ScoreBGRed.height = '100%'    
ScoreBGRed.hAlign = 'right'
ScoreBGRed.vAlign = 'center'
ScoreBGRed.width = '54%'
ScoreBGRed.color = Color4.FromHexString(`#dd0000ff`)

export let ScoreBGBlue = new UIContainerRect(MatchScoreContainer)
ScoreBGBlue.visible = true
ScoreBGBlue.height = '100%'    
ScoreBGBlue.hAlign = 'left'
ScoreBGBlue.vAlign = 'center'
ScoreBGBlue.width = '54%'
ScoreBGBlue.color = Color4.FromHexString(`#0000ddff`)

export let ScoreSeparatorBG = new UIContainerRect(MatchScoreContainer)
ScoreSeparatorBG.visible = true
ScoreSeparatorBG.height = '100%'    
ScoreSeparatorBG.hAlign = 'center'
ScoreSeparatorBG.vAlign = 'center'
ScoreSeparatorBG.width = '8%'
ScoreSeparatorBG.color = Color4.FromHexString(`#000000ff`)

export let MatchScoreSeparator= new UIText(ScoreSeparatorBG)
MatchScoreSeparator.value = ':'
MatchScoreSeparator.fontSize = 26
MatchScoreSeparator.width = '100%'
MatchScoreSeparator.vAlign = 'center'
MatchScoreSeparator.hAlign = 'center'
MatchScoreSeparator.hTextAlign = 'center'
MatchScoreSeparator.vTextAlign = 'center'
MatchScoreSeparator.positionY = 1
MatchScoreSeparator.textWrapping = true

export let MatchScoreMessageBlue = new UIText(ScoreBGBlue)
MatchScoreMessageBlue.value = '0'
MatchScoreMessageBlue.fontSize = 22
MatchScoreMessageBlue.width = '100%'
MatchScoreMessageBlue.vAlign = 'center'
MatchScoreMessageBlue.hAlign = 'center'
MatchScoreMessageBlue.hTextAlign = 'center'
MatchScoreMessageBlue.vTextAlign = 'center'
MatchScoreMessageBlue.textWrapping = true

export let MatchScoreMessageRed = new UIText(ScoreBGRed)
MatchScoreMessageRed.value = '0'
MatchScoreMessageRed.fontSize = 22
MatchScoreMessageRed.width = '100%'
MatchScoreMessageRed.vAlign = 'center'
MatchScoreMessageRed.hAlign = 'center'
MatchScoreMessageRed.hTextAlign = 'center'
MatchScoreMessageRed.vTextAlign = 'center'
MatchScoreMessageRed.textWrapping = true

// Bottom EDGE - ROOT  CONTAINER
let BottomContainer = new UIContainerRect(canvas)
BottomContainer.height = '40%'
BottomContainer.hAlign = 'center'
BottomContainer.vAlign = 'bottom'
BottomContainer.width = "30%"
//BottomContainer.color = Color4.FromHexString(`#00000088`)

export let AmmoSnow = new UIContainerRect(BottomContainer)
AmmoSnow.visible = true
AmmoSnow.height = '12%'    
AmmoSnow.hAlign = 'center'
AmmoSnow.vAlign = 'bottom'
AmmoSnow.width = '40%'
AmmoSnow.positionY = 40
AmmoSnow.color = Color4.FromHexString(`#ffffffff`)

export let AmmoSnow2 = new UIContainerRect(BottomContainer)
AmmoSnow2.visible = true
AmmoSnow2.height = '12%'    
AmmoSnow2.hAlign = 'center'
AmmoSnow2.vAlign = 'bottom'
AmmoSnow2.width = '40%'
AmmoSnow2.positionY = 35
AmmoSnow2.color = Color4.FromHexString(`#ccccccff`)

export let AmmoContainer = new UIContainerRect(BottomContainer)
AmmoContainer.visible = true
AmmoContainer.height = '12%'    
AmmoContainer.hAlign = 'center'
AmmoContainer.vAlign = 'bottom'
AmmoContainer.width = '40%'
AmmoContainer.positionY = 32
AmmoContainer.color = Color4.FromHexString(`#000000ff`)

export let AmmoLabel = new UIText(AmmoContainer)
AmmoLabel.value = 'Snowballs:'
AmmoLabel.fontSize = 14
AmmoLabel.width = '50%'
AmmoLabel.vAlign = 'center'
AmmoLabel.hAlign = 'left'
AmmoLabel.hTextAlign = 'center'
AmmoLabel.vTextAlign = 'center'
AmmoLabel.textWrapping = true

export let AmmoText = new UIText(AmmoContainer)
AmmoText.value = '0/10'
AmmoText.fontSize = 20
AmmoText.width = '40%'
AmmoText.vAlign = 'center'
AmmoText.hAlign = 'right'
AmmoText.hTextAlign = 'center'
AmmoText.vTextAlign = 'center'
AmmoText.textWrapping = true

export function updateAmmo(_currentAmmo:number, _maxAmmo:number){
   
    AmmoText.value = (_currentAmmo + "/" + _maxAmmo)
                
}

const readyColor = Color4.FromHexString(`#00ff0088`)
const notReadyColor = Color4.FromHexString(`#bb3300bb`)
const blackTranspBG = Color4.FromHexString(`#00000088`)
const activeTextColor = Color4.FromHexString(`#ffffffff`)
const inactiveTextColor = Color4.FromHexString(`#888888ff`)

let serverConnectionCard = new UIContainerRect(BottomContainer)
serverConnectionCard.visible = true
serverConnectionCard.height = '10%'
serverConnectionCard.hAlign = 'center'
serverConnectionCard.vAlign = 'bottom'
serverConnectionCard.width = "100%"
serverConnectionCard.color = Color4.FromHexString(`#00000088`)

let serverTitleBox = new UIContainerRect(serverConnectionCard)
serverTitleBox.height = '100%'
serverTitleBox.hAlign = 'left'
serverTitleBox.vAlign = 'top'
serverTitleBox.width = "50%"

let serverStatusBox = new UIContainerRect(serverConnectionCard)
serverStatusBox.height = '100%'
serverStatusBox.hAlign = 'right'
serverStatusBox.vAlign = 'top'
serverStatusBox.width = "50%"

export const serverTitleText = new UIText(serverTitleBox)
serverTitleText.visible = true
serverTitleText.paddingRight = 5
serverTitleText.value = "Game Server Status :"
serverTitleText.width = '100%'
serverTitleText.height = '100%'
serverTitleText.vAlign = 'center'
serverTitleText.hAlign = 'center'
serverTitleText.hTextAlign = 'right'
serverTitleText.vTextAlign = 'center'
serverTitleText.fontSize = 12
serverTitleText.color = Color4.White()
serverTitleText.outlineColor = Color4.White()
serverTitleText.outlineWidth = 0.2
serverTitleText.shadowColor = Color4.FromHexString('#000000aa')
serverTitleText.shadowOffsetX = -2
serverTitleText.shadowOffsetY = -2

export const serverStatusText = new UIText(serverStatusBox)
serverStatusText.visible = true
serverTitleText.paddingLeft = 5
serverStatusText.value = "WAITING FOR THE NEXT ROUND"
serverStatusText.width = '100%'
serverStatusText.height = '100%'
serverStatusText.vAlign = 'center'
serverStatusText.hAlign = 'center'
serverStatusText.hTextAlign = 'left'
serverStatusText.vTextAlign = 'center'
serverStatusText.fontSize = 12
serverStatusText.color = Color4.Yellow()
serverStatusText.outlineColor = Color4.Yellow()
serverStatusText.outlineWidth = 0.2
serverStatusText.shadowColor = Color4.FromHexString('#000000aa')
serverStatusText.shadowOffsetX = -2
serverStatusText.shadowOffsetY = -2

export function setServerStatusUI(text:string, _color?:Color4) {
    serverStatusText.value = text

    if(_color){
        serverStatusText.color = _color
        serverStatusText.outlineColor = _color
    }
}


export const CursorMessageContainer = new UIContainerRect(canvas)
CursorMessageContainer.visible = true
CursorMessageContainer.width = '25%'
CursorMessageContainer.height = '10%'
CursorMessageContainer.vAlign = 'center'
CursorMessageContainer.hAlign = 'center'
CursorMessageContainer.positionY= '42%'
CursorMessageContainer.color = Color4.FromHexString(`#000000bb`)

export const CursorMessageTitle = new UIText(CursorMessageContainer)
CursorMessageTitle.value = "TEAMS ARE READY!"
CursorMessageTitle.width = '100%'
CursorMessageTitle.height = '20%'
//CursorMessageTitle.positionY = '30%'
CursorMessageTitle.vAlign = 'top'
CursorMessageTitle.hAlign = 'center'
CursorMessageTitle.hTextAlign = 'center'
CursorMessageTitle.vTextAlign = 'center'
CursorMessageTitle.fontSize = 14
CursorMessageTitle.positionY = -5
CursorMessageTitle.color = Color4.White()

export const CursorMessage = new UIText(CursorMessageContainer)
CursorMessage.value = "5"
CursorMessage.width = '100%'
CursorMessage.height = '30%'
CursorMessage.positionY = '-7%'
CursorMessage.vAlign = 'center'
CursorMessage.hAlign = 'center'
CursorMessage.hTextAlign = 'center'
CursorMessage.vTextAlign = 'center'
CursorMessage.fontSize = 24
CursorMessage.color = Color4.Yellow()
CursorMessage.outlineColor = Color4.Yellow()
CursorMessage.outlineWidth = 0.2

export const serverMessageContainer = new UIContainerRect(canvas)
serverMessageContainer.visible = false
serverMessageContainer.width = '75%'
serverMessageContainer.height = '10%'
serverMessageContainer.vAlign = 'top'
serverMessageContainer.hAlign = 'center'
serverMessageContainer.color = Color4.FromHexString(`#000000bb`)



export const serverMessage = new UIText(serverMessageContainer)
serverMessage.value = "5"
serverMessage.width = '100%'
serverMessage.height = '30%'
serverMessage.positionY = '-5%'
serverMessage.vAlign = 'center'
serverMessage.hAlign = 'center'
serverMessage.hTextAlign = 'center'
serverMessage.vTextAlign = 'center'
serverMessage.fontSize = 20
serverMessage.color = Color4.Yellow()
serverMessage.outlineColor = Color4.Yellow()
serverMessage.outlineWidth = 0.2

export const InstructionContainer = new UIContainerRect(canvas)
InstructionContainer.visible = true
InstructionContainer.width = '22%'
InstructionContainer.height = '6%'
InstructionContainer.vAlign = 'bottom'
InstructionContainer.hAlign = 'center'
InstructionContainer.positionY = '12%'
InstructionContainer.color = Color4.FromHexString(`#00000088`)

export const instructionMessage = new UIText(InstructionContainer)
instructionMessage.value = `Hold 'F' to make snowballs (on empty parcels)\n`

instructionMessage.width = '100%'
instructionMessage.height = '30%'
instructionMessage.positionY = '-2%'
instructionMessage.vAlign = 'center'
instructionMessage.hAlign = 'center'
instructionMessage.hTextAlign = 'center'
instructionMessage.vTextAlign = 'center'
instructionMessage.paddingLeft = 12
instructionMessage.fontSize = 12
instructionMessage.color = Color4.Yellow()


export function displayInstructions(display:boolean){
    InstructionContainer.visible = display
}



export function DisplayCursorMessage(title:string, message:string, timeOut?:number){
  

  CursorMessage.value = message
  CursorMessageTitle.value = title
  CursorMessageContainer.visible = true

  if(timeOut){
    if(!cursorTimeoutSys.active){
      //engine.addSystem(cursorTimeoutSys)
      cursorTimeoutSys.startNew(timeOut)
    }
    else{
      cursorTimeoutSys.duration += timeOut
    }
  }
    
  
}
export function HideCursorMessage(){
    CursorMessage.value = ""
    CursorMessageTitle.value = ""
    CursorMessageContainer.visible = false
    
  }
export function updateUIScores(_team1Score:number, _team2Score:number){
    
    MatchScoreMessageBlue.value = _team1Score.toString()
    MatchScoreMessageRed.value = _team2Score.toString()
}
export function resetUIScores(){
    
    MatchScoreMessageRed.value = ("0")
    MatchScoreMessageBlue.value = ("0")

}


export function DisplayServerMessage( message:string){
    serverMessage.value = message    
    serverMessageContainer.visible = true
    engine.addSystem(new ServerMessageTimeout(3))
  
  }

  
class ServerMessageTimeout{  
    timer = 0
    duration:number = 3
  
    constructor(time?:number){
        if(time){
            this.duration = time
        }
      
    }
    update(dt: number){

      if(this.timer < this.duration){
        this.timer += dt
      }
      else{
        serverMessageContainer.visible = false
        engine.removeSystem(this)
      }
    }
  
  }

class CursorMessageTimeout{  
    timer = 0
    duration:number = 3
    active:boolean = false
  
    constructor(time?:number){
        if(time){
            this.duration = time
        }
      
    }
    update(dt: number){
      if(this.timer < this.duration){
        this.timer += dt
      }
      else{
        HideCursorMessage()
        this.active = false
       // engine.removeSystem(this)
      }
    }

    startNew(time:number){
        this.timer = 0
        this.duration = time
        this.active = true
    }
  
  }

  let cursorTimeoutSys = new CursorMessageTimeout(1)
  engine.addSystem(cursorTimeoutSys)