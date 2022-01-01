import TemplateWaifu from './templateWaifu'
import Message from './message'
import Modificator from './modificator'
const {getModificators} = Modificator
import WaifuEquipment from './item/waifuEquipment'
import {Action, ActionType} from './types/action'
import {EXP_DIFFICULTY, PAR_DIFFICULTY, TIME_ANALYSE, TIME_DECRYPTION, TEST_BUILD} from '../files/config.json'
import Discord from 'discord.js'
import {milliToHours} from '../genericFunctions/timeConversion'
import User from './user'

export default class waifu extends TemplateWaifu{
  public readonly objectType = "waifu"
  public xp = 0
  public lvl = 1
  public stars = 1
  public b_stg:number
  public b_agi:number
  public b_int:number
  public b_luck:number
  public b_dext:number
  public b_kaw:number

  public modificators: Array<Modificator> = [] //A retirer?
  public equipedItems: {
    "outfit": WaifuEquipment | null,
    "accessory" : WaifuEquipment | null,
    "weapon": WaifuEquipment | null
  } = {"outfit": null, "accessory": null, "weapon": null}
  public action: Action | null = null
  public owner: User | undefined //undefined when having no owner in deal transfer, sold in user shop or when converted to JSON format
  constructor(owner: User, template: TemplateWaifu = waifus.get("1")){
    super(template)
    this.owner = owner
    this.xp = 0
    this.lvl = 1
    this.stars = 1
    this.b_agi = template.o_agi
    this.b_luck = template.o_luck
    this.b_int = template.o_int
    this.b_stg = template.o_stg
    this.b_dext = template.o_dext
    this.b_kaw = template.o_kaw
  }


  get xplvlup(){
    if(this.lvl < 20){
      return 0.55*Math.pow(this.lvl,2.2) + 20
    }
    return 1.025*((-13/256000)*Math.pow(this.lvl,4) + (4471/96000)*Math.pow(this.lvl,3) +(-161/50)*this.lvl*this.lvl+ (42893/480)*this.lvl -422.29)
  }

  get maxLvl(){
    return 20 + 10*(this.stars-1) + getModificators(this, 'add_max_level').value
  }

  get stg(){
    const mult =  getModificators(this, 'mult_stg').value
    return this.b_stg*mult
  }

  get agi(){ // Renvoie la valeur avec modifs
    const mult =  getModificators(this, 'mult_agi').value
    return this.b_agi*mult
  }

  get int(){
    const mult = getModificators(this, 'mult_int').value
    return this.b_int*mult
  }

  get luck(){ // Renvoie la valeur avec modifs
    const mult = getModificators(this, 'mult_luck').value
    return this.b_luck*mult
  }

  get dext(){
    const mult = getModificators(this, 'mult_dext').value
    return this.b_dext*mult
  }

  get kaw(){
    const mult = getModificators(this, 'mult_kaw').value
    return this.b_kaw*mult
  }

  get phy(){
    const mult = getModificators(this, 'mult_phy').value
    return this.stg*mult
  }

  get psy(){
    const mult = getModificators(this, 'mult_psy').value
    return this.kaw*mult
  }

  get mag(){
    const mult = getModificators(this, 'mult_mag').value
    return this.int*mult
  }

  giveXP(xp: number, message: Message, useModificators = true, first = true){
    let mult = 1, totalXP
    if(useModificators){
      mult = getModificators(this, 'mult_XP').value
    }
    totalXP = xp*mult
    this.xp += totalXP
    if(this.xp >= this.xplvlup){
      if(this.lvl < this.maxLvl){
        this.xp -= this.xplvlup
        this.lvl++
        this.b_agi += this.u_agi
        this.b_luck += this.u_luck
        this.b_stg += this.u_stg
        this.b_kaw += this.u_kaw
        this.b_dext += this.u_dext
        this.b_int += this.u_int


        let tempxp = this.xp
        this.xp = 0
        if(first) message.addResponse(eval(getLoc)("level_up"))
        this.giveXP(tempxp, message, false, false)
      }
      else {
        message.addResponse(eval(getLoc)("max_lvl"))
      }
    }
    return Math.floor(totalXP)
  }

  get totalXP(){
    let totalXP = this.xp
    let virginWaifu = new waifu(this.owner!, waifus.get(this.id))

    for (var j = 1; j < this.lvl; j++) {
      totalXP += virginWaifu.xplvlup
      virginWaifu.lvl++
    }
    return totalXP
  }

  testSendMesAction(message: Message, sendMes:string | boolean = false){
    if(this.action && sendMes){
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
      message.addResponse(eval(getLoc)(sendMes)); timeLeft;
    }
    return !!this.action
  }

  timeWaiting(type: ActionType, lvl: number){
    let mult = 1
    let time = 0
    switch (type) {
      case "exploration" :
        time = EXP_DIFFICULTY[lvl]
        mult = getModificators(this, 'reduce_explo_time').value
        time = time/mult
        break;
      case "analyse":
        let timeReductor = (this.int/50)*1800*1000 //+ ANA_DIFFICULTY[lvl]
        mult = getModificators(this, 'reduce_analyse_time').value
        time = TIME_ANALYSE/mult - timeReductor
        break;
      case "decryption":
        mult = getModificators(this, 'reduce_decrypt_time').value
        let difficulty = PAR_DIFFICULTY[lvl]
        time = TIME_DECRYPTION/(mult*(1 + 2*(this.int/difficulty)))
        break;
    }
    if(TEST_BUILD) time = 10000
    return time
  }

  get attackSpeed(){
    return 5000/Math.pow(Math.E, this.agi/550)
  }

  get critRate(){

    return 0.05 + this.dext/1000
  }

  showStats(message: Message, number: number){
    var embed = new Discord.MessageEmbed()
    embed.setThumbnail(this.imgURL)
    embed.setTitle(`${this.name} ${"★".repeat(this.stars)}`)
    let multXP = getModificators(this, 'mult_XP').value
    let modificators = ""

    //let waifuTimeAction = getModificators(this, 'reduce_action_time')
    modificators += getModificators(this, 'reduce_explo_time').toString(message)
    modificators += getModificators(this, 'reduce_analyse_time').toString(message)
    modificators += getModificators(this, 'reduce_decrypt_time').toString(message)
    modificators += getModificators(this, 'add_artifact_level').toString(message)

    modificators += getModificators(this, 'mult_XP_std').toString(message)
    modificators += getModificators(this, 'mult_XP_mania').toString(message)
    modificators += getModificators(this, 'mult_XP_catch').toString(message)
    modificators += getModificators(this, 'mult_XP_taiko').toString(message)

    let multStg = this.stg / this.b_stg
    let multAgi = this.agi / this.b_agi
    let multInt = this.int / this.b_int
    let multLuck = this.luck / this.b_luck
    let multDext = this.dext / this.b_dext
    let multKaw = this.kaw / this.b_kaw

    const outfit = this.equipedItems.outfit
    const showOutfit = {name: eval(getLoc)("outfit"), value: outfit != null ? `${eval(getLoc)(outfit.name)} ${"★".repeat(outfit.rarity)} Lvl: ${outfit.lvl}`: eval(getLoc)("no_item_in_this_slot"), inLine: true}

    const weapon = this.equipedItems.weapon
    const showWeapon = {name: eval(getLoc)("sword"), value: weapon != null ? `${eval(getLoc)(weapon.name)} ${"★".repeat(weapon.rarity)} Lvl: ${weapon.lvl}`: eval(getLoc)("no_item_in_this_slot"), inLine: true}

    const accessory = this.equipedItems.accessory
    const showAccessory = {name: eval(getLoc)("outfit"), value: accessory != null ? `${eval(getLoc)(accessory.name)} ${"★".repeat(accessory.rarity)} Lvl: ${accessory.lvl}`: eval(getLoc)("no_item_in_this_slot"), inLine: true}

    embed.setColor(this.rarityColor as any)
    embed.addField("Stats", //the title of the embed
      `${eval(getLoc)("number")} : ${number + 1} \n
      Level : ${this.lvl}/${this.maxLvl}
      XP : ${Math.round(this.xp)}/${this.lvl != this.maxLvl ? this.xplvlup : "-"} ${multXP != 1 ? `(+${Math.round((multXP - 1)*100)}%)` : ""}
      STG : ${Math.round(this.stg)} ${multXP != 1 ? `(+${Math.round((multStg - 1)*100)}%)` : ""}
      AGI : ${Math.round(this.agi)} ${multXP != 1 ? `(+${Math.round((multAgi - 1)*100)}%)` : ""}
      INT : ${Math.round(this.int)} ${multXP != 1 ? `(+${Math.round((multInt - 1)*100)}%)` : ""}
      LUCK : ${Math.round(this.luck)} ${multXP != 1 ? `(+${Math.round((multLuck - 1)*100)}%)` : ""}
      DEXT : ${Math.round(this.dext)} ${multXP != 1 ? `(+${Math.round((multDext - 1)*100)}%)` : ""}
      KAW : ${Math.round(this.kaw)} ${multXP != 1 ? `(+${Math.round((multKaw - 1)*100)}%)` : ""}
      ${eval(getLoc)("rarity")} : ${this.rarityName(message)} \n`
    )
    embed.addFields(showOutfit, showWeapon, showAccessory)
    if(!modificators) modificators = eval(getLoc)("no_modificators")
    embed.addField(eval(getLoc)("modificators"),  modificators)
    return embed
  }
}
