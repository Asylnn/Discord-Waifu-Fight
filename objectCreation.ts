import {quest} from './class/types/quest'
import consumableUser from './class/item/consumableUser'
import consumableWaifu from './class/item/consumableWaifu'
import equipmentUser from './class/item/equipmentUser'
import equipmentWaifu from './class/item/equipmentWaifu'
import item from './class/item/item'
import material from './class/item/materials'

import dungeon from './class/dungeon'
import collection from './class/collection'
import randInt from './genericFunctions/randInt'
import templateWaifu from './class/templateWaifu'

const quest1: quest = {name:"get_claims", type:"osu", objective:4, difficulty:1, generalType:"claim", state:0}
const quest2: quest = {name:"get_claims", type:"osu", objective:8, difficulty:2, generalType:"claim", state:0}
const quest3: quest = {name:"get_claims", type:"osu", objective:16, difficulty:3, generalType:"claim", state:0}
//var quest4 = new quest("get_dango", "quest_obtain_dango", 1, 2)
//var quest1 = {name:"get_dango", type:"quest_obtain_dango", objective:1, difficulty:2, generalType:"other", state:0}
const quest4: quest = {name:"get_claims", type:"fruits", objective:4, difficulty:1, generalType:"claim", state:0}
const quest5: quest = {name:"get_claims", type:"fruits", objective:8, difficulty:2, generalType:"claim", state:0}
const quest6: quest = {name:"get_claims", type:"fruits", objective:16, difficulty:3, generalType:"claim", state:0}
const quest13: quest = {name:"get_box", type:"quest_box", objective:1, difficulty:1, generalType:"other", state:0}
const quest14: quest = {name:"get_box", type:"quest_box", objective:2, difficulty:2, generalType:"other", state:0}
const quest15: quest = {name:"get_box", type:"quest_box", objective:4, difficulty:3, generalType:"other", state:0}
const quest16: quest = {name:"get_money", type:"quest_money", objective:300, difficulty:1, generalType:"other", state:0}
const quest17: quest = {name:"get_money", type:"quest_money", objective:600, difficulty:2, generalType:"other", state:0}
const quest18: quest = {name:"get_money", type:"quest_money", objective:1200, difficulty:3, generalType:"other", state:0}
const quest19: quest = {name:"quest_analyse_artifact", type:"analyse_artifact", objective:1, difficulty:1, generalType:"other", state:0}
const quest20: quest = {name:"quest_decrypt_parchement", type:"decrypt_parchement", objective:1, difficulty:1, generalType:"other", state:0}
const quest21: quest = {name:"quest_do_exploration", type:"do_exploration", objective:3, difficulty:1, generalType:"other", state:0}
const quest22: quest = {name:"quest_do_exploration", type:"do_exploration", objective:6, difficulty:2, generalType:"other", state:0}
const quest23: quest = {name:"quest_do_exploration", type:"do_exploration", objective:9, difficulty:3, generalType:"other", state:0}
const quest24: quest = {name:"get_claims", type:"taiko", objective:4, difficulty:1, generalType:"claim", state:0}
const quest8: quest = {name:"get_claims", type:"taiko", objective:8, difficulty:2, generalType:"claim", state:0}
const quest9: quest = {name:"get_claims", type:"taiko", objective:16, difficulty:3, generalType:"claim", state:0}
const quest10: quest = {name:"get_claims", type:"mania", objective:4, difficulty:1, generalType:"claim", state:0}
const quest11: quest = {name:"get_claims", type:"mania", objective:8, difficulty:2, generalType:"claim", state:0}
const quest12: quest = {name:"get_claims", type:"mania", objective:16, difficulty:3, generalType:"claim", state:0}
const quest25: quest = {name:"finish_dungeon", type:"finish_dungeon", objective:2, difficulty:1, generalType:"other", state:0}
const quest26: quest = {name:"finish_dungeon", type:"finish_dungeon", objective:4, difficulty:2, generalType:"other", state:0}
const quest27: quest = {name:"finish_dungeon", type:"finish_dungeon", objective:8, difficulty:3, generalType:"other", state:0}

var artifact = new material("1", "artifact", "artifact_description", 1, 50, "")
var par1 = new material("2", "par1", "par1_description", 1, 50, "")
var par2 = new material("3", "par2", "par2_description", 1, 100, "")

var purse = new consumableUser("5", "purse", "purse_description", 1, 100, "", [{effectType:'earn_money', value:350}])
var trans_sparkle = new consumableUser("14", "trans_sparkle", "trans_sparkle_description", 1, 100, "", [{effectType:'set_multxp', value:10}])
var quest_reroll = new consumableUser("18", "quest_reroll", "quest_reroll_description", 1, 150, "", [{effectType:'quest_reroll', value:null}])




/*var xp_box = new item("xp_box", [{effect:'earn_XP', value:1500}], 75, "xp_box_description", "5", "waifuConsumable")
var xp_box2 = new item("xp_box", [{effect:'earn_XP', value:2300}], 150, "xp_box_description", "6", "waifuConsumable")
var xp_box3 = new item("xp_box", [{effect:'earn_XP', value:3400}], 225, "xp_box_description", "7", "waifuConsumable")*/
var item_extractor = new consumableWaifu("16", "item_extractor", "item_extractor_description", 1 , 150, "", [{effectType:'extract_item', value:1}])
var item_extractor2 = new consumableWaifu("17", "item_extractor2", "item_extractor2_description", 1 , 150, "", [{effectType:'extract_item', value:1}])
var lvl_upper = new consumableWaifu("13", "lvl_upper", "lvl_upper_description", 1 , 150, "", [{effectType:'level_up', value:1}])

/*
var luck_crystal = new item("luck_crystal", [{effect:'add_modificator', value:[{origin:"luck_crystal", type:'add_luck', value:5}]}], 50, "luck_crystal_description", "19", "waifuConsumable")
var luck_gem = new item("luck_gem", [{effect:'add_modificator', value:[{origin:"luck_gem", type:'add_luck', value:5}]}], 50, "luck_gem_description", "60", "waifuConsumable")
var exploration_crystal = new item("exploration_crystal", [{effect:'add_modificator', value:[{origin:"exploration_crystal", type:'mult_EX', value:1.10}]}], 50, "exploration_crystal_description", "20", "waifuConsumable")
var exploration_gem = new item("exploration_gem",  [{effect:'add_modificator', value:[{origin:"exploration_gem", type:'mult_EX', value:1.10}]}], 50, "exploration_gem_description", "61", "waifuConsumable")
var evolution_crystal = new item("evolution_crystal",[{effect:'add_modificator', value:[{origin:"evolution_crystal", type:'add_max_level', value:10}]}], 50, "evolution_crystal_description", "21", "waifuConsumable")
var evolution_gem = new item("evolution_gem",[{effect:'add_modificator', value:[{origin:"evolution_gem", type:'add_max_level', value:10}]}], 50, "evolution_gem_description", "62", "waifuConsumable")
var intelligence_crystal = new item("intelligence_crystal",[{effect:'add_modificator', value:[{origin:"intelligence_crystal", type:'mult_int', value:1.10}]}], 50, "intelligence_crystal_description", "22", "waifuConsumable")
var intelligence_gem = new item("intelligence_gem", [{effect:'add_modificator', value:[{origin:"intelligence_gem", type:'mult_int', value:1.10}]}], 50, "intelligence_gem_description", "63", "waifuConsumable")
var spirit_crystal = new item("spirit_crystal", [{effect:'add_modificator', value:[{origin:"spirit_crystal", type:'mult_XP', value:1.10}]}], 50, "spirit_crystal_description", "58", "waifuConsumable") //NEW
var spirit_gem = new item("spirit_gem", [{effect:'add_modificator', value:[{origin:"spirit_gem", type:'mult_XP', value:1.10}]}], 50, "spirit_gem_description", "59", "waifuConsumable")
var pure_gem = new item("pure_gem", [{effect:'add_modificator', value:[{origin:"pure_gem_int", type:'mult_int', value:1.1}, {origin:"pure_gem_lvl", type:'add_max_level', value:10, expirationTimestamp:-1}, {origin:"pure_gem_EX", type:'mult_EX', value:1.1, expirationTimestamp:-1}]}], 100, "pure_gem_description", "23", "waifuConsumable")

//ITEM 64 : BOX ITEM
//var xp_box_quest1 = new item("xp_box", [{effect:'earn_XP', value:1000}['earn_XP', 1000]], 0, "xp_box_description", "8")
//var xp_box_quest2 = new item("xp_box", [{effect:'earn_XP', value:1500}['earn_XP', 1500]], 0, "xp_box_description", "9")
//var xp_box_quest3 = new item("xp_box", [{effect:'earn_XP', value:2200}['earn_XP', 2200 - 3375]], 0, "xp_box_description", "10")
//var xp_box_extract 11
//var xp_box_moderator 12




var absolute_vision = new item("absolute_vision", [{origin:"absolute_vision", type:'mult_EX', value:1.20}], 300, "absolute_vision_description", "24", "waifuItem", 1)
var absolute_vision2 = new item("absolute_vision2", [{origin:"absolute_vision2", type:'mult_EX', value:1.40}], 500, "absolute_vision2_description", "25", "waifuItem", 2)
var absolute_vision3 = new item("absolute_vision3", [{origin:"absolute_vision3", type:'mult_EX', value:1.60}], 800, "absolute_vision3_description", "26", "waifuItem", 3)
var chunchunmaru = new item("chunchunmaru", [{origin:"chunchunmaru", type:'mult_XP', value:1.25}], 300, "chunchunmaru_description", "27", "waifuItem", 1)
var chunchunmaru2 = new item("chunchunmaru2", [{origin:"chunchunmaru2", type:'mult_XP', value:1.50}], 500, "chunchunmaru2_description", "28", "waifuItem", 2)
var chunchunmaru3 = new item("chunchunmaru3", [{origin:"chunchunmaru3", type:'mult_XP', value:1.75}], 800, "chunchunmaru3_description", "29", "waifuItem", 3)
var magnifying_glass = new item("magnifying_glass", [{origin:"magnifying_glass", type:'reduce_analyse_time', value:1.25}], 300, "magnifying_glass_description", "30", "waifuItem", 1)
var magnifying_glass2 = new item("magnifying_glass2", [{origin:"magnifying_glass2", type:'reduce_analyse_time', value:1.429}], 500, "magnifying_glass2_description", "31", "waifuItem", 2)
var magnifying_glass3 = new item("magnifying_glass3", [{origin:"magnifying_glass3", type:'reduce_analyse_time', value:1.666}], 800, "magnifying_glass3_description", "32", "waifuItem", 3)
var old_map = new item("old_map", [{origin:"old_map", type:'reduce_EX_time', value:1.111}], 300,"old_map_description", "44", "waifuItem", 1)
var old_map2 = new item("old_map2", [{origin:"old_map2", type:'reduce_EX_time', value:1.25}], 500,"old_map2_description", "45", "waifuItem", 2)
var cesar_manuscript = new item("cesar_manuscript", [{origin:"cesar_manuscript", type:'reduce_decrypt_time', value:1.25}], 300,"cesar_manuscript_description", "46", "waifuItem", 1)
var cesar_manuscript2 = new item("cesar_manuscript2", [{origin:"cesar_manuscript2", type:'reduce_decrypt_time', value:1.429}], 500,"cesar_manuscript2_description", "47", "waifuItem", 2)
var philosophical_papers = new item("philosophical_papers", [{origin:"philosophical_papers", type:'mult_int', value:1.2}], 300,"philosophical_papers_description", "48", "waifuItem", 1)
var philosophical_papers2 = new item("philosophical_papers2", [{origin:"philosophical_papers2", type:'mult_int', value:1.4}], 500,"philosophical_papers2_description", "49", "waifuItem", 2)

var xp_amplificator = new item("xp_amplificator", [{origin:"xp_amplificator", type:'mult_XP', value:1.1}], 300, "xp_amplificator_description", "33", "userItem", 1)
var xp_amplificator2 = new item("xp_amplificator2", [{origin:"xp_amplificator2", type:'mult_XP', value:1.2}], 500, "xp_amplificator2_description", "34", "userItem", 2)
var xp_amplificator3 = new item("xp_amplificator3", [{origin:"xp_amplificator3", type:'mult_XP', value:1.3}], 800, "xp_amplificator3_description", "35", "userItem", 3)
var fraud_parchment = new item("fraud_parchment", [{origin:"fraud_parchment", type:'mult_money_earned', value:1.1}], 300, "fraud_parchment_description", "41", "userItem", 1)
var fraud_parchment2 = new item("fraud_parchment2", [{origin:"fraud_parchment2", type:'mult_money_earned', value:1.2}], 500, "fraud_parchment2_description", "42", "userItem", 2)
var old_script = new item("old_script", [{origin:"old_script", type:'add_artifact_level', value:1}], 300, "old_script_description", "43", "userItem", 1)
var old_script2 = new item("old_script2", [{origin:"old_script2", type:'add_artifact_level', value:1}, {origin:"old_script2", type:'mult_int', value:1.05}], 500, "old_script_description_2", "64", "userItem", 1)
var se_clover = new item("se_clover", [{origin:"se_clover", type:'add_box_level', value:1}], 300, "se_clover_description", "36", "userItem", 1)
var se_clover2 = new item("se_clover2", [{origin:"se_clover2", type:'add_box_level', value:1}, {origin:"spirit_gem", type:'add_luck', value:3}], 500, "se_clover2_description", "37", "userItem", 2)


var soul_extractor = new item("soul_extractor", [{effect:'extract_XP', value:[0.4, true]}], 400, "soul_extractor_description", "38", "waifuConsumable")
var essence_extractor = new item("essence_extractor", [{effect:'extract_XP', value:[0.2,  true]}], 200, "essence_extractor_description", "39", "waifuConsumable")
var memory_extractor = new item("memory_extractor", [{effect:'extract_XP', value:[0.2, false]}], 200, "memory_extractor_description", "40", "waifuConsumable")





//var devil_pact = new item("devil_pact", [['equip_item', [['mult_XP', 2]]]])

//var Coronavirus = new item("coronavirus", [['equip_item', [['mult_EX', 0.7], ['add_luck', -15], ['mult_XP', 0.75], ['reduce_Action_time', 0.4]]]], true , 500, "coronavirus_description")
var consciousness_key = new item("consciousness_key", [{effect:'upgrade_base', value:null}] as any , 500, "consciousness_key_description", "50", "waifuConsumable")
var perfect_circle = new item("perfect_circle", [{effect:'upgrade_pippi', value:null}] as any, 500, "perfect_circle_description", "51", "waifuConsumable")
var dango = new item("dango", [{effect:'summon_nagisa', value:null}], 225, "dango_description", "52", "userConsumable")*/

// Collection des items

function getTotalWeight(col: collection<item, number>){
  let totalWeight = 0
  col.each(weight => {totalWeight += weight})
  return totalWeight
}


function getColRand(arr: Array<collection<item, number>>, lvl: number){
  const col = arr[lvl - 1]
  let w = 0
  let colWeight = getTotalWeight(col)
  let rand = randInt(colWeight)
  for(let i = 0; w <= rand; i++){
    w += col.array()[i]
    if (w > rand){return col.keyArray()[i]}
  }
}



class globalItemManager<keyType, stringType> extends collection<keyType, stringType>{
  constructor(arr: any[]){
    super(arr)
  }
  randItem(lvl: number, type: "box" | "ana" | "par"){
    if(lvl > 2) lvl = 2
    if(type == "box"){
      return getColRand(itemsBox, lvl)
    }
    else if( type == "ana"){
      return getColRand(itemsAnalyse, lvl)
    }
    else{
      return getColRand(itemsParchement, lvl)
    }
  }
}

type itemAll = equipmentUser | equipmentWaifu | consumableUser | consumableWaifu | material

declare global {
  var items: globalItemManager<string, itemAll>
  var itemShop: Array<{item:itemAll,  price:number}>
  var quests: Array<quest>
  var dungeons: Map<string, dungeon>
  var waifus: collection<string, templateWaifu>
  var gachaWaifus: Array<[templateWaifu, number]>
}

global.quests = [quest1, quest2, quest3, quest4, quest5, quest6 /*quest7 OOPS!*/, quest8, quest9, quest10, quest11, quest12, quest13, quest14, quest15, quest16, quest17, quest18, quest19, quest20, quest21, quest22, quest23, quest24, quest25, quest26, quest27]
global.items = new globalItemManager<string, itemAll>([]) // 52 items
global.itemShop = [{item:item_extractor, price:1000}, {item:item_extractor2, price:2000}]

//items.set("-1", new item())
items.set(artifact.id,artifact)
items.set(par1.id,par1)
items.set(par2.id,par2)
items.set(purse.id,purse)
/*items.set(xp_box.id,xp_box)
items.set(xp_box2.id,xp_box2)
items.set(xp_box3.id,xp_box3)*/
/*items.set(xp_box_quest1.id,xp_box_quest1)
items.set(xp_box_quest2.id,xp_box_quest2)
items.set(xp_box_quest3.id,xp_box_quest3)
items.set(xp_box_extract.id,xp_box_extract)
items.set(xp_box_moderator.id,xp_box_moderator)*/
items.set(lvl_upper.id,lvl_upper)
items.set(trans_sparkle.id,trans_sparkle)
/*items.set(luck_crystal.id,luck_crystal)
items.set(dedoubling.id,dedoubling)*/

/*items.set(exploration_crystal.id,exploration_crystal)
items.set(evolution_crystal.id,evolution_crystal)
items.set(intelligence_crystal.id,intelligence_crystal)
items.set(evolution_gem.id,evolution_gem)
items.set(absolute_vision.id,absolute_vision)
items.set(absolute_vision2.id,absolute_vision2)
items.set(chunchunmaru.id, chunchunmaru)
items.set(chunchunmaru2.id, chunchunmaru2)
items.set(magnifying_glass.id, magnifying_glass)
items.set(magnifying_glass2.id, magnifying_glass2)*/

/*items.set(xp_amplificator.id, xp_amplificator)
items.set(xp_amplificator2.id, xp_amplificator2)
items.set(fraud_parchment.id, fraud_parchment)
items.set(fraud_parchment2.id, fraud_parchment2)
items.set(se_clover.id, se_clover)
items.set(soul_extractor.id, soul_extractor)
items.set(essence_extractor.id, essence_extractor)
items.set(memory_extractor.id, memory_extractor)
items.set(old_script.id, old_script)
items.set(philosophical_papers.id, philosophical_papers)*/

/*items.set(old_map.id, old_map)
items.set(old_map2.id , old_map2)
items.set(cesar_manuscript.id, cesar_manuscript)
items.set(cesar_manuscript2.id, cesar_manuscript2)
items.set(philosophical_papers2.id, philosophical_papers2)
items.set(consciousness_key.id , consciousness_key)
items.set(perfect_circle.id , perfect_circle)
items.set(dango.id, dango)*/
items.set(quest_reroll.id, quest_reroll)
items.set(item_extractor.id, item_extractor)
items.set(item_extractor2.id, item_extractor2)

/*
items.set(luck_gem.id,luck_gem)
items.set(spirit_gem.id,spirit_gem)
items.set(exploration_gem.id,exploration_gem)
items.set(intelligence_gem.id,intelligence_gem)
items.set(pure_gem.id,pure_gem)
*/


/*let itemsBoxL1 = new collection<item, number>([[par1, 12], [purse, 1], [trans_sparkle, 1], [evolution_crystal, 1], [intelligence_crystal, 1], [exploration_crystal, 1], [luck_crystal, 1], [lvl_upper, 1]])
let itemsBoxL2 = new collection<item, number>([[par2, 12], [purse, 1], [trans_sparkle, 1], [evolution_crystal, 1], [intelligence_crystal, 1], [exploration_crystal, 1], [luck_crystal, 1], [lvl_upper, 1]])
let itemsBoxL3 = new collection<item, number>([[par2, 12], [purse, 1], [trans_sparkle, 1], [evolution_crystal, 1], [intelligence_crystal, 1], [exploration_crystal, 1], [luck_crystal, 1], [lvl_upper, 1]])*/

let itemsBoxL1 = new collection<item, number>([])
let itemsBoxL2 = new collection<item, number>([])
let itemsBoxL3 = new collection<item, number>([])

var itemsBox = [itemsBoxL1, itemsBoxL2, itemsBoxL3]


/*let itemsAnalyseL1 = new collection<item, number>([[xp_box, 12], [lvl_upper, 12], [exploration_crystal, 12] , [luck_crystal, 12], [intelligence_crystal, 12], [exploration_crystal, 12], [trans_sparkle, 12], [absolute_vision, 12],
                                             [chunchunmaru, 12], [magnifying_glass, 12], [xp_amplificator, 4], [se_clover, 4], [essence_extractor, 4]])
let itemsAnalyseL2 = new collection<item, number>([[xp_box2, 12], [lvl_upper, 12],[exploration_crystal, 12] , [luck_crystal, 12], [intelligence_crystal, 12], [exploration_crystal, 12], [trans_sparkle, 12], [absolute_vision, 12],
                                             [chunchunmaru, 12], [magnifying_glass, 12], [xp_amplificator, 4], [se_clover, 4], [absolute_vision2, 6], [chunchunmaru2, 6], [magnifying_glass2, 6], [xp_amplificator2, 2],
                                             [se_clover2, 2], [memory_extractor, 2], [soul_extractor, 2]])*/



let itemsAnalyseL1 = new collection<item, number>([])
let itemsAnalyseL2 = new collection<item, number>([])
/*let itemsAnalyseL3 = new collection([[xp_box2, 12], [lvl_upper, 12],[exploration_crystal, 12] , [luck_crystal, 12], [intelligence_crystal, 12], [exploration_crystal, 12], [trans_sparkle, 12], [absolute_vision, 12],
                                            [chunchunmaru, 12], [magnifying_glass, 12], [xp_amplificator, 4], [se_clover, 4], [absolute_vision2, 6], [chunchunmaru2, 6], [magnifying_glass2, 6], [xp_amplificator2, 2],
                                            [absolute_vision3, 3], [chunchunmaru3, 3], [magnifying_glass3, 3], [se_clover2, 2], [se_clover3, 1], [xp_amplificator3, 1], [memory_extractor, 2], [soul_extractor, 2]])
let itemsAnalyseL4 = new collection([[xp_box2, 12], [lvl_upper, 12],[exploration_crystal, 12] , [luck_crystal, 12], [intelligence_crystal, 12], [exploration_crystal, 12], [trans_sparkle, 12], [absolute_vision2, 12],
                                            [chunchunmaru2, 12], [magnifying_glass2, 12], [xp_amplificator2, 4], [se_clover2, 4], [absolute_vision3, 6], [chunchunmaru3, 6], [magnifying_glass3, 6], [xp_amplificator3, 2],
                                            [absolute_vision4, 3], [chunchunmaru4, 3], [magnifying_glass4, 3], [se_clover3, 2], [se_clover4, 1], [xp_amplificator4, 1], [memory_extractor, 2], [soul_extractor, 2]])
let itemsAnalyseL5 = new collection([[xp_box2, 12], [lvl_upper, 12],[exploration_crystal, 12] , [luck_crystal, 12], [intelligence_crystal, 12], [exploration_crystal, 12], [trans_sparkle, 12], [absolute_vision3, 12],
                                            [chunchunmaru3, 12], [magnifying_glass3, 12], [xp_amplificator3, 4], [se_clover3, 4], [absolute_vision4, 6], [chunchunmaru4, 6], [magnifying_glass4, 6], [xp_amplificator4, 2],
                                            [absolute_vision5, 3], [chunchunmaru5, 3], [magnifying_glass5, 3], [se_clover4, 2], [se_clover5, 1], [xp_amplificator5, 1], [memory_extractor, 2], [soul_extractor, 2]])
let itemsAnalyseL6 = new collection([[xp_box2, 12], [lvl_upper, 12],[exploration_crystal, 12] , [luck_crystal, 12], [intelligence_crystal, 12], [exploration_crystal, 12], [trans_sparkle, 12], [absolute_vision4, 12],
                                            [chunchunmaru4, 12], [magnifying_glass4, 12], [xp_amplificator4, 4], [se_clover4, 4], [absolute_vision5, 6], [chunchunmaru5, 6], [magnifying_glass5, 6], [xp_amplificator5, 2],
                                            [absolute_vision6, 3], [chunchunmaru6, 3], [magnifying_glass6, 3], [se_clover5, 2], [se_clover6, 1], [xp_amplificator6, 1], [memory_extractor, 2], [soul_extractor, 2]])
let itemsAnalyseL7 = new collection([[xp_box2, 12], [lvl_upper, 12],[exploration_crystal, 12] , [luck_crystal, 12], [intelligence_crystal, 12], [exploration_crystal, 12], [trans_sparkle, 12], [absolute_vision5, 12],
                                            [chunchunmaru5, 12], [magnifying_glass5, 12], [xp_amplificator5, 4], [se_clover5, 4], [absolute_vision6, 6], [chunchunmaru6, 6], [magnifying_glass6, 6], [xp_amplificator6, 2],
                                            [absolute_vision7, 3], [chunchunmaru7, 3], [magnifying_glass7, 3], [se_clover6, 2], [se_clover7, 1], [xp_amplificator7, 1], [memory_extractor, 2], [soul_extractor, 2]])*/
var itemsAnalyse = [itemsAnalyseL1, itemsAnalyseL2]

let itemsParchementL1 = new collection<item, number>([])
let itemsParchementL2 = new collection<item, number>([])

/*
let itemsParchementL1 = new collection<item, number>([[old_script, 4], [fraud_parchment, 4], [old_map, 12], [cesar_manuscript, 12], [philosophical_papers, 12]])
let itemsParchementL2 = new collection<item, number>([[old_script, 4], [fraud_parchment, 4], [old_map, 12], [cesar_manuscript, 12], [philosophical_papers, 12], [old_script2, 2], [fraud_parchment2, 2], [old_map2, 6], [cesar_manuscript2, 6],
                                              [philosophical_papers2, 6]])
*/

/*let itemsParchementL3 = new collection([[old_script, 4], [fraud_parchment, 4], [old_map, 12], [cesar_manuscript, 12], [philosophical_papers, 12], [old_script2, 2], [fraud_parchment2, 2], [old_map2, 6], [cesar_manuscript2, 6],
                                              [philosophical_papers2, 6], [old_script3, 4], [fraud_parchment3, 4], [old_map3, 12], [cesar_manuscript3, 12], [philosophical_papers3, 12]])
let itemsParchementL4 = new collection([[old_script2, 4], [fraud_parchment2, 4], [old_map2, 12], [cesar_manuscript2, 12], [philosophical_papers2, 12], [old_script3, 2], [fraud_parchment3, 2], [old_map3, 6], [cesar_manuscript3, 6],
                                              [philosophical_papers3, 6], [old_script4, 4], [fraud_parchment4, 4], [old_map4, 12], [cesar_manuscript4, 12], [philosophical_papers4, 12]])
let itemsParchementL5 = new collection([[old_script3, 4], [fraud_parchment3, 4], [old_map3, 12], [cesar_manuscript3, 12], [philosophical_papers3, 12], [old_script4, 2], [fraud_parchment4, 2], [old_map4, 6], [cesar_manuscript4, 6],
                                              [philosophical_papers5, 6], [old_script5, 4], [fraud_parchment5, 4], [old_map5, 12], [cesar_manuscript5, 12], [philosophical_papers5, 12]])
let itemsParchementL6 = new collection([[old_script4, 4], [fraud_parchment4, 4], [old_map4, 12], [cesar_manuscript4, 12], [philosophical_papers4, 12], [old_script5, 2], [fraud_parchment5, 2], [old_map5, 6], [cesar_manuscript5, 6],
                                              [philosophical_papers5, 6], [old_script6, 4], [fraud_parchment6, 4], [old_map6, 12], [cesar_manuscript6, 12], [philosophical_papers6, 12]])
let itemsParchementL7 = new collection([[old_script5, 4], [fraud_parchment5, 4], [old_map5, 12], [cesar_manuscript5, 12], [philosophical_papers5, 12], [old_script6, 2], [fraud_parchment6, 2], [old_map6, 6], [cesar_manuscript6, 6],
                                              [philosophical_papers6, 6], [old_script7, 4], [fraud_parchment7, 4], [old_map7, 12], [cesar_manuscript7, 12], [philosophical_papers7, 12]])*/
var itemsParchement = [itemsParchementL1, itemsParchementL2]

global.waifus = new collection<string, templateWaifu>()

var createTemplateWaifu = (id: string, imgURL: string, name: string, diffLvlUp: number, o_stg: number, o_agi: number, o_int: number, o_luck: number, o_dext: number, o_kaw: number,
  u_stg: number, u_agi: number, u_int: number, u_luck: number, u_dext: number, u_kaw: number, rarity:number, value:number, isTradable:boolean = true) => {
  waifus.set(id, new templateWaifu({id, imgURL,name,diffLvlUp, o_stg, o_agi, o_int, o_luck, o_dext, o_kaw, u_stg, u_agi, u_int, u_luck, u_dext, u_kaw, rarity, value, isTradable}))
}

createTemplateWaifu("1",'https://cdn.discordapp.com/attachments/504676515414540289/683320377929105415/43e236eaee120b8e57183428fcd50a98.jpg', "Shouko Nishimiya", 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)
/*
//var custom = new templateWaifu("0", "",'custom',0.8,39,2,1,250,20,21,1) //Creation)
var bwaifu1 = new templateWaifu("1",'https://cdn.discordapp.com/attachments/504676515414540289/683320377929105415/43e236eaee120b8e57183428fcd50a98.jpg'
,'Shouko Nishimiya',0.7,50,4,1,250,20,20,1) //Starter
var bwaifu12 = new templateWaifu("12",'https://cdn.discordapp.com/attachments/613549071009054732/680208171826020414/Louise.Francoise.de.La.Baume.Le.Blanc.de.La.Valliere.600.2640243.jpg'
,'Louise',0.7,50,4,1,250,20,20,1) //Starter
var bwaifu13 = new templateWaifu("13",'https://cdn.discordapp.com/attachments/504676515414540289/683320381561372677/Kaga.Kouko.full.1651054.png'
,'Kouko Kaga',0.7,50,4,1,260,20,20,1) //Starter
var bwaifu2 = new templateWaifu("2",'https://media.discordapp.net/attachments/667840990794481704/668170111982764063/4e1bc3e8a4c32270081e8b3f650e1f44.jpg?width=559&height=559'
,'Mirai',0.8,28,2,1,100,20,14,1) //Shop
var bwaifu3 = new templateWaifu("3",'https://media.discordapp.net/attachments/504676515414540289/672469531674804242/Kanzaki.png?width=559&height=559'
,'Hideri Kanzaki',0.9,32,2,1,80,25,13,1) //Shop
var bwaifu5 = new templateWaifu("5",'https://cdn.discordapp.com/attachments/670987441712136202/672190103619371009/Z.png'
,'Levi Kazama',0.8,38,2,1,120,20,14,1) //Shop
var bwaifu9 = new templateWaifu("9",'https://media.discordapp.net/attachments/504676515414540289/672884072200142851/Himouto_umaru_chan_umaru_happy_stitch_by_jonesy974-d921nro.jpg?width=641&height=560'
,'Umaru Doma',0.8,24,2,1,80,10,10,1) //Shop
var bwaifu23 = new templateWaifu("23",'https://cdn.discordapp.com/attachments/504676515414540289/688025460596408354/366719.jpg'
,'Yotsuba Nakano',0.8,56,2,1,100,10,13,1) //Shop
var bwaifu24 = new templateWaifu("24",'https://cdn.discordapp.com/attachments/504676515414540289/688025472172294195/4f2bd4ec7812c69e9c304d72050cee28.jpg'
,'Miku Nakano',0.8,35,2,1,100,20,13,1) //Shop
var bwaifu25 = new templateWaifu("25",'https://cdn.discordapp.com/attachments/504676515414540289/688025506007875634/188893.jpg'
,'Itsuki Nakano',0.8,36,2,1,100,20,13,1) //Shop
var bwaifu26 = new templateWaifu("26",'https://cdn.discordapp.com/attachments/504676515414540289/688025461909094405/378953.jpg'
,'Ichika Nakano',0.8,54,2,1,100,10,13,1) //Shop
var bwaifu20 = new templateWaifu("20",'https://cdn.discordapp.com/attachments/504676515414540289/688025470276861996/kuronuma_sawako_6120.jpg'
,'Kuranuma Sawako',0.8,30,2,1,80,15,14,1) //Shop
var bwaifu21 = new templateWaifu("21",'https://cdn.discordapp.com/attachments/504676515414540289/688052951939416109/229815.jpg'
,'Himeragi Yukina',0.8,29,2,1,100,20,14,1) //Shop
var bwaifu22 = new templateWaifu("22",'https://cdn.discordapp.com/attachments/504676515414540289/688030909710073877/Df6eP2HA.png'
,'Neptune',0.8,37,2,1,120,20,13,1) //Shop
var bwaifu41 = new templateWaifu("41",'https://cdn.discordapp.com/attachments/688093897032728596/697550058060775454/576bb78fa87819cccac844095ad1baa6.png',
'Kirigaya Suguha',0.8,31,2,1,100,20,11,1)

var bwaifu4 = new templateWaifu("4",'https://cdn.discordapp.com/attachments/670987441712136202/671435929105334282/rem-angry-expression-chains-re-zero-kara-hajimeru-isekai-seikatsu-anime-5493.png'
,'Rem',0.9,44,3,2,500,30,21,1) //Shop
var bwaifu44 = new templateWaifu("44",'https://media.discordapp.net/attachments/705910214045597757/867458903506419762/205699-kirino-kousaka-1920x1080.png',
'Kirino Kousaka',0.9,31,2,2,500,30,47,2) //Shop
var bwaifu6 = new templateWaifu("6",'https://media.discordapp.net/attachments/666739143778500639/672472999764426772/2AgQZeFH.png'
,'Kurumi Tokisaki',0.7,41,2,2,300,30,19,1) //Daily
var bwaifu7 = new templateWaifu("7",'https://cdn.discordapp.com/attachments/504676515414540289/672474136840241212/248219.jpg'
,'Stephanie Dola',1,51,3,2,550,35,16,1) //Daily
var bwaifu10 = new templateWaifu("10",'https://media.discordapp.net/attachments/504676515414540289/675769062361399306/taiga_aisaka.png'
,'Taiga Aisaka',1,49,3,2,1200,35,16,1) // +10 waifus
var bwaifu16 = new templateWaifu("16",'https://cdn.discordapp.com/attachments/504676515414540289/687263865980846087/Tanya_in_manga_2.jpg'
,'Tanya Degurechaff',1,54,3,2,1000,24,20,1) //Obtain SS
var bwaifu17 = new templateWaifu("17",'https://cdn.discordapp.com/attachments/504676515414540289/687263838747361309/telechargement_3.jpg'
,'Kaguya Shinomiya',1,48,3,2,2000,35,46,1) //Obtain +10000 yens
var bwaifu19 = new templateWaifu("19",'https://cdn.discordapp.com/attachments/504676515414540289/687263851066032192/53a7b8e3508afa5e20a9f4c3bbc385d2.jpg'
,'Hitagi Senjougahara',1.1,31,3,2,1500,30,53,2) //Obtain +30 items
var bwaifu27 = new templateWaifu("27",'https://cdn.discordapp.com/attachments/504676515414540289/688025467013431359/images_1.jpg'
,'Shinoa Hiiragi',0.9,45,3,2,500,30,22,1) //Shop
var bwaifu28 = new templateWaifu("28",'https://cdn.discordapp.com/attachments/504676515414540289/688025468695216192/images_2.jpg'
,'Nino Nakano',0.8,57,3,2,100,25,13,1) //Shop
var bwaifu29 = new templateWaifu("29",'https://media.discordapp.net/attachments/504676515414540289/688025476236968074/130702-full.png?width=749&height=562'
,'Rui Tachibana',1,52,3,2,500,35,14,1) //Box LVL 1 & 2
var bwaifu37 = new templateWaifu("37",'https://cdn.discordapp.com/attachments/504676515414540289/688025473976238149/130128-full.jpg'
,'Hina Tachibana',1,62,3,2,500,30,14,1) //Box LVL 1 & 2
var bwaifu40 = new templateWaifu("40",'https://cdn.discordapp.com/attachments/688093897032728596/697546398140203079/ifyBKwz.png%27',
'Asada Shino',1,59,3,2,500,35,13,1)
var bwaifu42 = new templateWaifu("42",'https://cdn.discordapp.com/attachments/688093897032728596/697554440596750437/alice-beautiful-wallpaper-sao.png',
'Alice Zuberg',0.9,58,3,2,500,40,26,1)
var bwaifu43 = new templateWaifu("43",'https://cdn.discordapp.com/attachments/688093897032728596/697557822874976266/unknown.png',
'Quinella',1,104,4,2,500,30,16,1)
var bwaifu18 = new templateWaifu("18",'https://cdn.discordapp.com/attachments/672515818025779220/700355211977556039/Haruhi_Suzumiya_2.jpg'
,'Haruhi Suzumiya',1,72,4,2,2500,65,31,1) //Obtain +100POW

var bwaifu11 = new templateWaifu("11",'https://media.discordapp.net/attachments/670987441712136202/672542675353731102/Akatsuki.Log.Horizon.full.1611504.jpg?width=559&height=559'
,'Akatsuki',1,75,4,3,900,40,31,1) //Box LVL 1 & 2
var bwaifu8 = new templateWaifu("8",'https://media.discordapp.net/attachments/504676515414540289/672470767610494986/Koito.Yuu.full.2413032.jpg?width=614&height=559'
,'Yuu Koito',1,72,4,3,1100,50,32,1) //Daily
var bwaifu38 = new templateWaifu("38",'https://cdn.discordapp.com/attachments/504676515414540289/692391446002532372/YumekoCat.jpg'
,'Yumeko Jabami',1,71,4,3,1600,40,49,2) //Shop
var bwaifu30 = new templateWaifu("30",'https://media.discordapp.net/attachments/504676515414540289/691753587235356692/telechargement.jpg'
,'Pippi',1,74,4,3,1000,45,31,1) //1000 claim
var bwaifu31 = new templateWaifu("31",'https://cdn.discordapp.com/attachments/504676515414540289/692062877531504640/68747470733a2f2f7075752e73682f6f354878712f643438366232313937362e6a7067.jpg'
,'Maria',1,73,4,3,1000,45,32,1) //1000 claim
var bwaifu32 = new templateWaifu("32",'https://cdn.discordapp.com/attachments/504676515414540289/691753600547815464/3adf930f28b215afc358be63974914cf71f7d78c_00.jpg'
,'Yuzu',1,72,4,3,1000,45,33,1) //1000 claim
var bwaifu33 = new templateWaifu("33",'https://cdn.discordapp.com/attachments/504676515414540289/692063705915195513/tnnhb7xm9iv21.png'
,'Mocha',1,71,4,3,1000,45,34,1) //1000 claim
var bwaifu34 = new templateWaifu("34",'https://cdn.discordapp.com/attachments/504676515414540289/692062022002802718/furukawa_nagisa_3793.jpg'
,'Nagisa Furukawa',1,109,5,3,800,30,26,1) // 7 dango plushie


var bwaifu14 = new templateWaifu("14",'https://cdn.discordapp.com/attachments/504676515414540289/687263895509139469/takanashi_rikka_9138.jpg'
,'Takanashi Rikka',1.1,89,5,4,1600,60,13,1) //LVL 2 BOX
var bwaifu15 = new templateWaifu("15",'https://cdn.discordapp.com/attachments/504676515414540289/687263879964917766/flat750x075f-pad750x1000f8f8f8.jpg'
,'Yuno Gasai',1,79,5,4,1600,65,46,1) //NOT OBRAINABLE BATTLE ROYALE EVENT
var bwaifu35 = new templateWaifu("35",'https://cdn.discordapp.com/attachments/504676515414540289/691753585498914897/ffbde5fb9b6a10f9a841664a65681413.png'
,'Zero Two',1.1,86,5,4,1500,65,48,1) //weekly
var bwaifu36 = new templateWaifu("36",'https://cdn.discordapp.com/attachments/504676515414540289/692062017455915118/f50bbbc7599643785181e5b487478572.jpeg'
,'Ushio Okazaki',1.1,133,6,4,1000,40,9,1) //kill nagisa
var bwaifu39 = new templateWaifu("39",'https://cdn.discordapp.com/attachments/688093897032728596/697543629388120065/Asuna_cut.png'
,'Asuna',1.25,103,5,4,1600,60,61,1) //NOT OBRAINABLE BATTLE ROYALE EVENT

var Yui = new templateWaifu("1000",'https://media.discordapp.net/attachments/670986388702887947/670993486308311077/ZJys4.jpg?width=439&height=559'
,'Yui',1.2,120,7,5,4000,75,20,1)
var ultimate = new templateWaifu("1001",'https://media.discordapp.net/attachments/504676515414540289/687388709607571480/Walpurgis_Tomoe.png'
,'Walpurgisnacht',0.6,690,42,5,1000000,150,20,1)
var nakano = new templateWaifu("1002",'https://cdn.discordapp.com/attachments/504676515414540289/688050514134695993/Quintuplets_color_art_-_volume_6_release.jpg'
,'Soeurs Nakano',0.6,999,42,1,200,999,999,42)





//global.gachaWaifus = [[bwaifu44, 4], [bwaifu38, 2 /*very rare], [bwaifu1, 2], [bwaifu12, 2] ,[bwaifu13, 2], [bwaifu27, 4], [bwaifu2, 2], [bwaifu3, 2], [bwaifu5, 2], [bwaifu9, 2], [bwaifu28, 4], [bwaifu22, 2], [bwaifu21, 2], [bwaifu20, 2], [bwaifu26, 2], [bwaifu25, 2], [bwaifu24, 2], [bwaifu23, 2]]


for (var i = 1; i < 45; i++) {
  waifus.set(i.toString(), eval("bwaifu"+i))
}
waifus.set("1000", Yui)
waifus.set("0", custom)
waifus.set("1001", ultimate)
waifus.set("1002", nakano)*/
