import message from '../class/message'
import userClass from '../class/user'
import {PREFIX, ASYLN_DISCORD_ID} from '../files/config.json'
import truncate from '../genericFunctions/truncate'
import save from '../save'
import setOsuId from './variableModification/setOsuId'
import setOsuName from './variableModification/setOsuName'


import confirmAccCreation from './uncategorized/confirmAccCreation'

import useItemXP from './items/useItemXP'
import useWaifuXP from './items/useWaifuXP'
import sell from './shop/sell'
import buy from './shop/buy'
import gacha from './shop/gacha'

import claim from './osu/claim'
import fight from './osu/fight'
import addMapSet from './osu/addMapSet'

import giveBox from './admin/giveBox'
import giveItem from './admin/giveItem'
import giveWaifu from './admin/giveWaifu'
import giveXP from './admin/giveXP'
import giveMoney from './admin/giveMoney'

import editname from './variableModification/editname'
import language from './variableModification/language'
import setDefaultWaifu from './variableModification/setDefaultWaifu'
import setMode from './variableModification/setMode'


import allexp from './waifuActions/allexp'
import analyse from './waifuActions/analyse'
import decrypt from './waifuActions/decrypt'
import exp from './waifuActions/exp'
import mining from './waifuActions/mining'
import cafe from './waifuActions/cafe'
import stopAction from './waifuActions/stopAction'




import createWaifu from './managment/createWaifu'
import recycle from './managment/recycle'
import replaceWaifu from './managment/replaceWaifu'
import sortWaifu from './managment/sortWaifus'
import swap from './managment/swap'
import upgradeWaifu from './managment/upgradeWaifu'

import equipItem from './items/equipItem'
import useConsumable from './items/useConsumable'

import items from './information/items'
import lb from './information/lb'
import quests from './information/quests'
import reserve from './information/reserve'
import shop from './information/shop'
import stats from './information/stats'
import waifus from './information/waifus'
import textCreateAcc from './information/textCreateAccount'
import textHelp from './information/textHelp'
import waifuCollection from './information/waifuCollection'
import dungeons from './information/dungeon'

import enterDungeon from './dungeon/enterDungeon'

import accept from './trades/accept'
import refuse from './trades/refuse'
import seeDealCommand from './trades/seeDealCommand'
//import startDeal from './trades/startDeal'
import remove from './trades/remove'
import add from './trades/add'
import sendTerms from './trades/sendTerms'



import box from './uncategorized/box'
import daily from './uncategorized/daily'
import dmCreateAcc from './uncategorized/dmCreateAcc'

export default function replyCommand(message: message, user: userClass, args: Array<string>, initialMessage: any): void{
  console.log("ah")
  let commandStatus: Promise<boolean | undefined> = new Promise((resolve) => resolve(true))
  message.authorId = user.id
  args[0] = args[0]?.replace(PREFIX, "")
  message.lg = user.lg
  const command = message.type + "-" + (args[0] || initialMessage.commandName)
  switch(command){
    case "GUILD_TEXT-createuser":
    case "GUILD_TEXT-cu":
      (new userClass(user.id, "Asyln")).save()
      message.addResponse("account created")
      break;
    case "GUILD_TEXT-stop":
    case "DM-stop":
      if(user.id == "297788049230921728"){
        const u:any = {}
        u.obj420.obj2.ob3[69]
      }
      else{
        message.addResponse("nope")
      }
      break;
    case "DM-createacc":
      commandStatus = dmCreateAcc(message, user, args)
      break;
    case "GUILD_TEXT-help":
    case "interaction-help":
      commandStatus = textHelp(message, user)
      break;
    case "GUILD_TEXT-createacc":
      commandStatus = textCreateAcc(message, initialMessage)
      break;
    case "osu-confirm":
      confirmAccCreation(message, initialMessage)
      break;
    case 'GUILD_TEXT-addmapset':
      commandStatus = addMapSet(message, args)
      break;
    /*case 'GUILD_TEXT-addmap':
      addMap(message, user, args)
      break;
    case 'GUILD_TEXT-removemap':
      removeMapset(message, user, args)
      break;
    case 'GUILD_TEXT-removemapset':
      removeMap(message, user, args)
      break;*/
    case "DM-eval":
    case "GUILD_TEXT-eval":
      if(user.id == "297788049230921728"){
        try {
          eval(truncate(message.content, 0))
          user.save()
          message.addResponse("success")
        } catch (e) {
          message.addResponse("error, more in console")
          console.log(e)
        }
      }
      else{
        message.addResponse("nope")
      }
      break;
    case "DM-save":
    case "GUILD_TEXT-save":
      if(user.id == "297788049230921728"){
        try {
          save()
          message.addResponse("save complete")
        } catch (e) {
          console.log(e)
          message.addResponse("save failed!")
        }
      }
      else{
        message.addResponse("nope")
      }
      break;
    //TO BE REMOVED
    case "GUILD_TEXT-gac":
      user.gachaCurrency += 200000
      message.addResponse("got 200 000 free gac lulz")
      user.save()
      break;
    case "GUILD_TEXT-givebox":
      commandStatus = giveBox(message, args, initialMessage)
      break;
    case "GUILD_TEXT-givexp":
      commandStatus = giveXP(message, args, initialMessage)
      break;
    case "GUILD_TEXT-givecoins":
      commandStatus = giveMoney(message, args, initialMessage)
      break;
    case "GUILD_TEXT-givewaifu":
      commandStatus = giveWaifu(message, initialMessage)
      break;
    case "GUILD_TEXT-giveitem":
      commandStatus = giveItem(message, args, initialMessage)
      break;
    case (!user.verified ? command : "LÖVBACKEN") :  // XXXXXXXXXXX ---- Test if the user have an account ---- XXXXXXXXXXX //
      message.addResponse(eval(getLoc)('no_account'))
      break;
    case "GUILD_TEXT-r":
    case "GUILD_TEXT-rw":
    case "GUILD_TEXT-reserve":
    case "GUILD_TEXT-reservewaifu":
    case "interaction-reserve":
      commandStatus = reserve(message, user, args, initialMessage)
      break;
    case "osu-osuname":
    case "GUILD_TEXT-osuname":
    case "osu-setosuname":
    case "GUILD_TEXT-setosuname":
    case "interaction-setosuname":
      commandStatus = setOsuName(message,user, args, initialMessage)
      break;
    case "GUILD_TEXT-osuid":
    case "osu-setosuid":
    case "GUILD_TEXT-setosuid":
    case "interaction-setosuid":
      commandStatus = setOsuId(message,user, args, initialMessage)
      break;
    case "GUILD_TEXT-language":
    case "GUILD_TEXT-lg":
    case "interaction-language":
      commandStatus = language(message, user)
      break;
    case "GUILD_TEXT-i":
    case "GUILD_TEXT-items":
    case "interaction-items":
      commandStatus = items(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-collection":
    case "interaction-collection":
      commandStatus = waifuCollection(message, user)
      break;
    case "GUILD_TEXT-nomention":
    case "GUILD_TEXT-nomentions":
    case "osu-nomention":
    case "osu-nomentions":
      user.beMentionned = !user.beMentionned
      message.addResponse(eval(getLoc)(user.beMentionned ? "get_notifications" : "no_notification"))
      user.save()
      break;
    case "GUILD_TEXT-hidereply":
    case "osu-hidereply":
      user.ephemeral = !user.ephemeral
      message.addResponse(eval(getLoc)(!user.ephemeral ? "show_reply" : "hide_reply"))
      user.save()
      break;
    case "GUILD_TEXT-editname":
    case "interaction-editname":
    case "osu-editname":
      commandStatus = editname(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-lb":
    case "GUILD_TEXT-leaderboard":
    case "interaction-leaderboard":
      commandStatus = lb(message, args, initialMessage)
      break;
    case "osu-default":
    case "interaction-defaultwaifu":
    case "GUILD_TEXT-default":
      commandStatus = setDefaultWaifu(message, user, args, initialMessage)
      break;
    case "DM-add":
      commandStatus = add(message, user, args)
      break;
    case "DM-remove":
      commandStatus = remove(message, user, args)
      break;
    case "DM-seedeal":
      commandStatus = seeDealCommand(message, user)
      break;
    case "DM-sendterms":
      commandStatus = sendTerms(message, user)
      break;
    case "DM-refuse":
      commandStatus = refuse(message, user)
      break;
    case "DM-accept":
      commandStatus = accept(message, user)
      break;
    case "GUILD_TEXT-setmode":
    case "GUILD_TEXT-gamemode":
    case "interaction-gamemode":
      commandStatus = setMode(message, user, args)
      break;
    case "GUILD_TEXT-exp":
    case "osu-exp":
    case "GUILD_TEXT-explore":
    case "interaction-explore":
    case "osu-explore":
      commandStatus = exp(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-allexp":
    case "GUILD_TEXT-expall":
    case "osu-expall":
    case "osu-allexp":
      commandStatus = allexp(message, user, args)
      break;
    case "GUILD_TEXT-stop":
    case "GUILD_TEXT-stopaction":
    case "osu-stop":
    case "osu-stopaction":
    case "interaction-stopaction":

      commandStatus = stopAction(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-analyse":
    case "interaction-analyse":
    case "osu-analyse":
      commandStatus = analyse(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-daily":
    case "interaction-daily":
    case "osu-daily":
      commandStatus = daily(message, user)
      break;
    case "GUILD_TEXT-decrypt":
    case "interaction-decrypt":
    case "osu-decrypt":
      commandStatus = decrypt(message, user, args, initialMessage)
    break;
    case "GUILD_TEXT-cafe":
    case "interaction-cafe":
    case "osu-cafe":
      commandStatus = cafe(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-mine":
    case "interaction-mining":
    case "osu-mine":
    case "osu-mining":
    case "GUILD_TEXT-mining":
      commandStatus = mining(message, user, args, initialMessage)
      break;
    case "osu-quest":
    case "osu-quests":
    case "GUILD_TEXT-quest":
    case "GUILD_TEXT-quests":
    case "interaction-quests":
      commandStatus = quests(message, user)
      break;
    case "GUILD_TEXT-s":
    case "GUILD_TEXT-stats":
    case "GUILD_TEXT-rank":
    case "interaction-stats":
      commandStatus = stats(message, user, initialMessage)
      break;
    case "GUILD_TEXT-w":
    case "GUILD_TEXT-waifu":
    case "GUILD_TEXT-waifus":
    case "interaction-waifus":
      commandStatus = waifus(message, user, initialMessage)
      break
    /*case "osu-request":
      if(user.milestone & w(35) == 0){message.addResponse(eval(getLoc)("lvl_too_low")); return;}
      if(global.hasCreatedLobby){
        global.lobby.invitePlayer(user.osuName)
      }
      else{
        if(!global.multiplayersPlayers.some(multiplayerPlayer => multiplayerPlayer.osuName == user.osuName)){
          global.multiplayersPlayers.push(user)
          message.addResponse(eval(getLoc)("lobby_creation_waiting"))
        }
        else{
          message.addResponse(eval(getLoc)("lobby_already_requested"))
        }
      }
      break;*/
    case (user.currentDealId != "-1" ? command : "LÖVBACKEN") : // XXXXXXXXXXX ---- Test if the user isn't in a trade ---- XXXXXXXXXXX //
      message.addResponse(eval(getLoc)("in_deal"))
      break;

    case "GUILD_TEXT-enterdungeon":
    case "GUILD_TEXT-enter":
    case "dm-enterdungeon":
    case "dm-enter":
    case "interaction-enter":
      commandStatus = enterDungeon(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-dungeon":
    case "GUILD_TEXT-dungeons":
    case "interaction-dungeon":
      commandStatus = dungeons(message, user)
      break;
    /*case "GUILD_TEXT-startdeal":
      commandStatus = startDeal(message, user, initialMessage)
      break;*/
    case "GUILD_TEXT-replace":
    case "GUILD_TEXT-replacewaifu":
    case "interaction-replace":
      commandStatus = replaceWaifu(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-recycle":
    case "interaction-recycle":
      commandStatus = recycle(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-action":
    case "GUILD_TEXT-actions":
    case "interaction-action":
      user.waifus.forEach(waifu => waifu?.testSendMesAction(message, "doing_action"))
      break;
    case "GUILD_TEXT-swap":
    case "interaction-swap":
      commandStatus = swap(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-e":
    case "GUILD_TEXT-equip":
    case "GUILD_TEXT-equipitem":
    case "interaction-equip":
      commandStatus = equipItem(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-use":
    case "GUILD_TEXT-useItem":
    case "GUILD_TEXT-useConsumable":
    case "interaction-use":
      commandStatus = useConsumable(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-usewaifuxp":
    case "GUILD_TEXT-givewaifuxp":
    case "GUILD_TEXT-uwx":
    case "GUILD_TEXT-gwx":
    case "interaction-usewaifuxp":
      commandStatus = useWaifuXP(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-useitemxp":
    case "GUILD_TEXT-giveitemxp":
    case "GUILD_TEXT-uix":
    case "GUILD_TEXT-gix":
    case "interaction-useitemxp":
      commandStatus = useItemXP(message, user, args, initialMessage)
      break;
    case "interaction-gacha":
    case "GUILD_TEXT-gacha":
      commandStatus = gacha(message, user)
      break;
    case "GUILD_TEXT-create":
    case "GUILD_TEXT-createwaifu":
    case "interaction-createwaifu":
      commandStatus = createWaifu(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-f":
    case "GUILD_TEXT-fight":
    case "osu-f":
    case "osu-fight":
    case "interaction-fight":
      commandStatus = fight(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-c":
    case "GUILD_TEXT-claim":
    case "osu-claim":
    case "osu-c":
    case "interaction-claim":
      commandStatus = claim(message, user)
      break;
    /*case "osu-use":
      use(message, user, args)
      break;*/
    case "GUILD_TEXT-box":
    case "osu-box":
    case "interaction-box":
      commandStatus = box(message, user)
      break;
    case "GUILD_TEXT-u":
    case "GUILD_TEXT-upgradewaifu":
    case "GUILD_TEXT-upgrade":
    case "interaction-upgrade":
      commandStatus = upgradeWaifu(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-sell":
    case "interaction-sell":
      commandStatus = sell(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-shop":
    case "interaction-shop":
      commandStatus = shop(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-sortwaifu":
    case "interaction-sortwaifu":
      commandStatus = sortWaifu(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-buy":
    case "interaction-buy":
      commandStatus = buy(message, user, args, initialMessage)
      break;
    default:
      message.addResponse(eval(getLoc)("command_not_exist"))
      break;
  }

  commandStatus.then(hasUserNotBeenModified => {
    if(!hasUserNotBeenModified ){
      user.save()
    }
  }).catch(err => {
    console.log(err)
    message.addResponse(`ERROR : ${err.toString()} <@${ASYLN_DISCORD_ID}>`)
  }).finally(async () => {
    await message.reply()
  })
}
