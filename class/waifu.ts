import templateWaifu from './templateWaifu'
import message from './message'
import { modificator } from './types/modificator'
import item from './item'
import {action, actionType} from './types/action'
import {EXP_DIFFICULTY, PAR_DIFFICULTY, TIME_ANALYSE, TIME_DECRYPTION} from '../files/config.json'
import Discord from 'discord.js'
import getModificators from '../genericFunctions/getModificators'
import {milliToHours} from '../genericFunctions/timeConversion'
import user from './user'

export default class waifu extends templateWaifu{
  public readonly objectType = "waifu"
  public xp:number
  public lvl:number
  public b_int:number
  public b_luck:number
  public b_exp:number
  public stars:number
  public modificators: Array<modificator> = []
  public equipedItems: Array<item> = [new item()]
  public action: action = {isDoingAction:false, lvl:0, timeWaiting:-1, createdTimestamp:-1, type:"analyse"}
  public owner: user

  constructor(owner: user, template = new templateWaifu()){
        super(template.id,template.imgURL, template.name, template.diffLvlUp,template.o_exp,template.u_exp,
              template.rarity ,template.value ,template.o_luck ,template.o_int ,template.u_int)
    this.owner = owner
    this.xp = 0
    this.lvl = 1
    this.stars = 1
    this.b_exp = template.o_exp
    this.b_luck = template.o_luck
    this.b_int = template.o_int
  }

  get xplvlup(){
    return Math.floor(((1 + this.diffLvlUp)*this.lvl*this.lvl + 5*this.lvl + 20)*this.diffLvlUp)
  }

  get maxLvl(){
    return 20 + 10*(this.stars-1) + getModificators(this, 'add_max_level')
  }

  get exp(){ // Renvoie la valeur avec modifs
    const mult = getModificators(this, 'mult_EX')
    return this.b_exp*mult
  }

  get luck(){ // Renvoie la valeur avec modifs
    const addluck = getModificators(this, 'add_luck')
    return this.b_luck + addluck
  }

  get int(){
    const mult = getModificators(this, 'mult_int')
    return this.b_int*mult
  }

  giveXP(xp: number, message: message, useModificators = true, first = true){
    let mult = 1, totalXP
    if(useModificators){
      mult = getModificators(this, 'mult_XP')
    }
    totalXP = xp*mult
    this.xp += totalXP
    if(this.xp >= this.xplvlup){
      if(this.lvl < this.maxLvl){
        this.xp -= this.xplvlup
        this.lvl++
        this.b_exp += this.u_exp
        this.b_int += this.u_int
        let tempxp = this.xp
        this.xp = 0
        if(first) message.reply(eval(getLoc)("level_up"))
        this.giveXP(tempxp, message, false, false)
      }
      else {
        message.reply(eval(getLoc)("max_lvl"))
      }
    }
    return Math.floor(totalXP)
  }

  get totalXP(){
    let totalXP = this.xp
    let virginWaifu = new waifu(this.owner, waifus.get(this.id))

    for (var j = 1; j < this.lvl; j++) {
      totalXP += virginWaifu.xplvlup
      virginWaifu.lvl++
    }
    return totalXP
  }

  testSendMesAction(message: message, sendMes:string | boolean = false){
    if(this.action.isDoingAction && sendMes){
      let actionType
      if(this.action.type == 'exploration'){
        actionType = eval(getLoc)("an_exploration"); actionType;
      }
      else if(this.action.type == 'analyse'){
        actionType = eval(getLoc)("an_analyse")
      }
      else if(this.action.type == 'decryption'){
        actionType = eval(getLoc)("an_decrypt")
      }
      let timeLeft = milliToHours(this.action.createdTimestamp + this.action.timeWaiting - message.createdTimestamp)
      message.reply(eval(getLoc)(sendMes)); timeLeft;
    }
    return this.action.isDoingAction
  }

  timeWaiting(type: actionType, lvl: number){
    let mult = 1
    let time = 0
    switch (type) {
      case "exploration" :
        time = EXP_DIFFICULTY[lvl]
        mult = getModificators(this, 'reduce_EX_time')
        time = time/mult
        break;
      case "analyse":
        let timeReductor = (this.int/50)*1800*1000 //+ ANA_DIFFICULTY[lvl]
        mult = getModificators(this, 'reduce_analyse_time')
        time = TIME_ANALYSE/mult - timeReductor
        break;
      case "decryption":
        mult = getModificators(this, 'reduce_decrypt_time')
        let difficulty = PAR_DIFFICULTY[lvl]
        time = TIME_DECRYPTION/(mult*(1 + 2*(this.int/difficulty)))
        break;
    }
    return time
  }

  showStats(message: message, number: number){
    var embed = new Discord.MessageEmbed()
    embed.setThumbnail(this.imgURL)
    embed.setTitle(`${this.name} ${"★".repeat(this.stars)}`)
    let multXP = getModificators(this, 'mult_XP')
    let modificators = ""

    //let waifuTimeAction = getModificators(this, 'reduce_action_time')
    let waifuTimeEX = getModificators(this, 'reduce_EX_time')
    let waifuTimeAnalyse = getModificators(this, 'reduce_analyse_time')
    let waifuTimeDecrypt = getModificators(this, 'reduce_decrypt_time')
    let addArtifactLevel = getModificators(this, 'add_artifact_level')
    //if(waifuTimeAction != 1){modificators += `${eval(getLoc)("reduce_action_time")} : ${Math.round((1 - 1 / waifuTimeAction)*100)}% \n`}
    if(waifuTimeEX != 1){modificators += `${eval(getLoc)("reduce_explo_time")} : ${Math.round((1 - 1 / waifuTimeEX)*100)}% \n`}
    if(waifuTimeAnalyse != 1){modificators += `${eval(getLoc)("reduce_analyse_time")} : ${Math.round((1 - 1 / waifuTimeAnalyse)*100)}% \n`}
    if(waifuTimeDecrypt != 1){modificators += `${eval(getLoc)("reduce_decrypt_time")} : ${Math.round((1 - 1 / waifuTimeDecrypt)*100)}% \n`}
    if(addArtifactLevel != 0){modificators += `${eval(getLoc)("add_artifact_level")} : ${addArtifactLevel} \n`}

    let XPstdMult = getModificators(this, 'mult_XP_std')
    let XPmaniaMult = getModificators(this, 'mult_XP_mania')
    let XPcatchMult = getModificators(this, 'mult_XP_catch')
    let XPtaikoMult = getModificators(this, 'mult_XP_taiko')
    if(XPstdMult != 1){modificators += `${eval(getLoc)("incr_xp_gain_std")} : ${Math.round(XPstdMult*100 - 100)}% \n`}
    if(XPmaniaMult != 1){modificators += `${eval(getLoc)("incr_xp_gain_mania")} : ${Math.round(XPmaniaMult*100 - 100)}% \n`}
    if(XPcatchMult != 1){modificators += `${eval(getLoc)("incr_xp_gain_catch")} : ${Math.round(XPcatchMult*100 - 100)}% \n`}
    if(XPtaikoMult != 1){modificators += `${eval(getLoc)("incr_xp_gain_taiko")} : ${Math.round(XPtaikoMult*100 - 100)}% \n`}

    let addLuck = this.luck - this.b_luck
    let multEX = this.exp / this.b_exp
    let multInt = this.int / this.b_int
    let itemContent = ""
    this.equipedItems.forEach((item, i) => {
      itemContent += `${eval(getLoc)("item")} ${i+1}: `
      if(item.id != "-1") itemContent += `${eval(getLoc)("equiped_item")} : ${eval(getLoc)(item.name) + "★".repeat(this.equipedItems[0].tier)} \n`
      else itemContent += eval(getLoc)("no_item") + "\n"
    })

    embed.setColor(this.rarityColor as any)
    embed.addField("Stats", //the title of the embed
      `${eval(getLoc)("number")} : ${number + 1} \n
      Level : ${this.lvl}/${this.maxLvl}
      XP : ${Math.round(this.xp)}/${this.lvl != this.maxLvl ? this.xplvlup : "-"} (+${Math.round((multXP - 1)*100)}%)
      EX : ${Math.round(this.exp)} (+${Math.round((multEX - 1)*100)}%)
      LUCK : ${this.luck} (+${addLuck})
      INT : ${Math.round(this.int)} (+${Math.round((multInt - 1)*100)}%)
      ${eval(getLoc)("rarity")} : ${this.rarityName(message)} \n
      ${itemContent} \n
      ${eval(getLoc)("modificators")} : \n${modificators}`)

    message.reply(embed as any)
  }

}
