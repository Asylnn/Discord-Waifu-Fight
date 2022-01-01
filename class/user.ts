import Waifu from "./waifu"
import ItemManager from "./itemManager"
import UserEquipment from "./item/userEquipment"
import QuestManager from "./questManager"
import gamemode from "./types/gamemode"
import {PAR_LEVEL, ANA_LEVEL, BOX_LEVEL} from '../files/config.json'
import Message from './message'
import Modificator from './modificator'
const {getModificators} = Modificator
import WaifuManager from './waifuManager'
import {deepCopy} from '../genericFunctions/copy'
import randInt from '../genericFunctions/randInt'

export default class user{
  public readonly waifuManager: WaifuManager
  public readonly objectType = "user"
  public readonly id: string
  public osuId = 0
  public osuName: string
  public waifus: Array<Waifu | null>
  public quests: QuestManager

  public modificators: Array<Modificator> = []
  public multXP = 1
  public _money = 500
  public reserveWaifu: Array<Waifu> = []
  public dailyTimestamp = 0
  public beMentionned = true
  public boxs: Array<number> = []
  public items: ItemManager = new ItemManager()
  public equipedItems: Array<UserEquipment | null> = [null]
  public milestone: bigint = 0n
  public playedMapsIds: Array<number> = []
  public verified = true
  public gamemode: gamemode = "osu"
  public playCount: {"osu":number, "mania":number, "taiko":number, "fruits":number} = {"osu":0, "mania":0, "taiko":0, "fruits":0}
  public lg = defaultLanguage
  public lvl = 1
  public xp = 0
  public defaultWaifu = 0
  public fight: {isInAFight:boolean, beatmapId: number, indexWaifu: number, mode:gamemode, time: number} = {isInAFight:false, beatmapId: 0, indexWaifu:0, mode:"osu", time: -1}
  public canAddMap = false
  public waifuXP = 0
  public itemXP = 0
  public currentDealId = "-1"
  public isDoingDungeon = false
  public gachaCurrency = 0
  public ephemeral = true

  constructor(id: string, osuName: string){

    this.waifus = [new Waifu(this, waifus.get(["1", "12", "13"][randInt(3)])), null, null]
    this.id = id
    this.osuName = osuName
    this.quests = new QuestManager(this)
    this.waifuManager = new WaifuManager(this)
  }

  get boxLevel(){
    const boxLevelModificator = getModificators(this, 'add_box_level').value
    return 1 + boxLevelModificator + BOX_LEVEL.reduce((accumulator: number, level: number) => {
      if(level <= this.lvl) return ++accumulator
      else return accumulator
    },0)
  }

  get parLevel(){
    const boxLevelModificator = getModificators(this, 'add_par_level').value
    return 1 + boxLevelModificator + PAR_LEVEL.reduce((accumulator: number, level: number) => {
      if(level <= this.lvl) return ++accumulator
      else return accumulator
    },0)
  }

  get anaLevel(){
    const boxLevelModificator = getModificators(this, 'add_artifact_level').value
    return 1 + boxLevelModificator + ANA_LEVEL.reduce((accumulator: number, level: number) => {
      if(level <= this.lvl) return ++accumulator
      else return accumulator
    },0)
  }

  get xplvlup(){
    return Math.floor(Math.pow(this.lvl, 1.6)*0.4 + this.lvl + 4)
  }

  get allWaifus(){
    return this.waifus.concat(this.reserveWaifu)
  }

  set money(coins){
    const mult = getModificators(this, 'mult_money_earned').value
    this.quests.updateQuest("quest_money", coins*mult)
    this._money += coins*mult
  }

  get money(){
    return this._money
  }

  get totalClaims(){
    return this.playCount.osu + this.playCount.mania + this.playCount.taiko + this.playCount.fruits
  }

  async save(){
    await users.put(this.id, deepCopy(this))
  }

  giveXP(xp: number, message: Message, first = true){
    this.xp += xp
    if(this.xp >= this.xplvlup){
      this.xp -= this.xplvlup
      this.lvl++
      let tempxp = this.xp
      this.xp = 0
      if(first) message.addResponse(eval(getLoc)("user_level_up"))
      switch(this.lvl){
        case 5:
          message.addResponse(eval(getLoc)("access_command_upgrade"))
          break;
        case 4:
          message.addResponse(eval(getLoc)("access_command_editname"))
          break;
        case 6:
          message.addResponse(eval(getLoc)("access_command_recycle"))
          break;
        case 7:
          message.addResponse(eval(getLoc)("access_command_create"))
          break;
        case 11:
          message.addResponse(eval(getLoc)("access_command_buy"))
          break;
        case 9:
          message.addResponse(eval(getLoc)("access_command_sort"))
          break;
        case 12:
          message.addResponse(eval(getLoc)("access_command_deal"))
          break;
        case 8:
          message.addResponse(eval(getLoc)("access_command_collection"))
          break;
        case 10:
          message.addResponse(eval(getLoc)("access_command_shop"))
          break;

      }
      this.giveXP(tempxp, message, false)
    }
  }
}
