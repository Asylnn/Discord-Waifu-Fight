import {deepCopy} from '../genericFunctions/copy'
import {quest, questType} from './types/quest'
import user from './user'
import randInt from '../genericFunctions/randInt'

export default class questManager{
  public readonly objectType = "questManager"
  public totalQuestDone: number
  public activeQuests: Array<quest>
  public date: number
  public owner: user
  public maxQuests: number
  constructor(owner: user){
    this.maxQuests = 3 //NEW
    this.owner = owner
    this.totalQuestDone = 0
    this.activeQuests = []
    this.date = (new Date()).getDate()
    this.objectType;
    if(owner) this.refreshQuests()
  }

  refreshQuests(){
    let quest1:quest, quest2:quest, difficulty: number
    this.date = (new Date()).getDate()

    const questClaimArray = deepCopy(quests.filter(quest => quest.generalType =="claim" && (quest.difficulty == 1 || quest.type == this.owner.gamemode)))
    const questClaim = questClaimArray[randInt(questClaimArray.length)]
    difficulty = questClaim.difficulty

    const quest1Arr = deepCopy(quests.filter((quest: quest) => quest.difficulty == difficulty % 3 + 1 && quest.generalType != "claim"))
    quest1 = quest1Arr[randInt(quest1Arr.length)]
    const quest2Arr = deepCopy(quests.filter((quest: quest) => quest.difficulty == (difficulty + 1) % 3 + 1 && quest.type != quest1.type && quest.generalType != "claim"))
    quest2 = quest2Arr[randInt(quest2Arr.length)]
    this.activeQuests = [questClaim, quest1, quest2].sort((questA, questB) => questB.difficulty - questA.difficulty)
  }

  updateQuest(type: questType, amount = 1){
    this.activeQuests.forEach((quest: quest) => {
      if(quest.type == type)
        quest.state += amount
    });
  }

}
