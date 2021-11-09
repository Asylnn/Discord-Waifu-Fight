import message from '../class/message'
import userClass from '../class/user'
import {PREFIX, ASYLN_DISCORD_ID} from '../files/config.json'
import truncate from '../genericFunctions/truncate'
//import item from '../class/item'
//import itemManager from '../class/itemManager'
import save from '../save'

/*
 Do a command that unequip item


*/
var w = (nb:number) => BigInt(Math.pow(2, nb))

import setOsuId from './variableModification/setOsuId'
import setOsuName from './variableModification/setOsuName'


import confirmAccCreation from './uncategorized/confirmAccCreation'


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
import stopAction from './waifuActions/stopAction'




import createWaifu from './managment/createWaifu'
import recycle from './managment/recycle'
import replaceWaifu from './managment/replaceWaifu'
import sortWaifu from './managment/sortWaifus'
import swap from './managment/swap'
import upgradeWaifu from './managment/upgradeWaifu'

import equipUserItem from './items/equipUserItem'
import equipWaifuItem from './items/equipWaifuItem'
import useUserConsumable from './items/useUserConsumable'
import useWaifuConsumable from './items/useWaifuConsumable'
import useWaifuXP from './items/useWaifuXP'

import items from './information/items'
import lb from './information/lb'
import quests from './information/quests'
import rank from './information/rank'
import reserve from './information/reserve'
import shop from './information/shop'
import stats from './information/stats'
import textCreateAcc from './information/textCreateAccount'
import textHelp from './information/textHelp'
import waifuCollection from './information/waifuCollection'



import accept from './trades/accept'
import refuse from './trades/refuse'
import seeDealCommand from './trades/seeDealCommand'
import startDeal from './trades/startDeal'
import remove from './trades/remove'
import add from './trades/add'
import sendTerms from './trades/sendTerms'



import box from './uncategorized/box'
import daily from './uncategorized/daily'
import dmCreateAcc from './uncategorized/dmCreateAcc'


commandManager?.create({
  name:"createuser",
  type:"CHAT_INPUT",
  description:"DEV ONLY - Create new user (osu name and id is always asyln)",
})

export default function replyCommand(message: message, user: userClass, args: Array<string>, initialMessage: any): void{
  let commandStatus: Promise<boolean | undefined> = new Promise((resolve) => resolve(true))
  message.authorId = user.id
  args[0] = args[0]?.replace(PREFIX, "")
  message.lg = user.lg
  const command = message.type + "-" + (args[0] || initialMessage.commandName)
  switch(command){
    case "GUILD_TEXT-createuser":
    case "GUILD_TEXT-cu":
    case "interaction-createuser":
      (new userClass(user.id, "Asyln", 10669137)).save()
      message.addResponse("account created")
      break;
    case "GUILD_TEXT-leave":
    case "DM-leave":
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
      addMapSet(message, args)
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
          //userX.milestone = userX.milestone ^ w(parseInt(Smessage[1]))

          eval(truncate(message.content, 0))
          user.save()
          message.addResponse("success")
        } catch (e) {
          console.log(e)
        }
      }
      else{
        message.addResponse("nope")
      }
      break;
    case "DM-giveaway":
    case "GUILD_TEXT-giveaway":
      if(user.id == "297788049230921728"){
        (async function(){
          (await users.all()).forEach(user2 => {

            /*if((w(0) & user2.milestone) != 0n) user2.giveXP(50, message)
            if((w(4) & user2.milestone) != 0n) user2.giveXP(50, message)
            if((w(5) & user2.milestone) != 0n) user2.giveXP(100, message)
            if((w(7) & user2.milestone) != 0n) user2.giveXP(50, message)
            if((w(12) & user2.milestone) != 0n) user2.giveXP(25, message)
            if((w(13) & user2.milestone) != 0n) user2.giveXP(50, message)
            if((w(14) & user2.milestone) != 0n) user2.giveXP(250, message)
            if((w(15) & user2.milestone) != 0n) user2.giveXP(500, message)
            if((w(30) & user2.milestone) != 0n) user2.giveXP(100, message)
            if((w(31) & user2.milestone) != 0n) user2.giveXP(550, message)
            if((w(32) & user2.milestone) != 0n) user2.giveXP(500, message)

            user2.items.addItem("19",5)
            user2.items.addItem("20",5)
            user2.items.addItem("21",5)
            user2.items.addItem("23",5)

            user2.giveXP(user2.totalClaims*1, message)
            user2.giveXP(user2.quests.totalQuestDone*10, message)*/

            user2.milestone = user2.milestone & (w(40) - w(14) - 1n)
            user2.milestone = user2.milestone & (w(40) - w(30) - 1n)
            user2.milestone = user2.milestone & (w(40) - w(31) - 1n)


            user2.save()
          })
        })()
        message.addResponse('done!')
      }
      else{
        message.addResponse("nope")
      }
      break;
    case "DM-save":
      if(user.id == "297788049230921728"){
        try {
          save()
        } catch (e) {
          console.log(e)
        }
      }
      else{
        message.addResponse("nope")
      }
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
    case "GUILD_TEXT-reserve":
    case "GUILD_TEXT-reservewaifu":
      commandStatus = reserve(message, user, args)
      break;
    case "osu-osuname":
    case "GUILD_TEXT-osuname":
    case "osu-setosuname":
    case "GUILD_TEXT-setosuname":
    case "interaction-setosuname":
      commandStatus = setOsuName(message,user, args, initialMessage)
      break;
    case "osu-setosuid":
    case "GUILD_TEXT-setosuid":
    case "interaction-setosuid":
      commandStatus = setOsuId(message,user, args, initialMessage)
      break;
    case "GUILD_TEXT-language":
    case "GUILD_TEXT-lg":
    case "osu-language":
    case "osu-lg":
    case "interaction-language":
      commandStatus = language(message, user)
      break;
    case "GUILD_TEXT-i":
    case "GUILD_TEXT-items":
      commandStatus = items(message, user, args)
      break;
    case "GUILD_TEXT-collection":
      commandStatus = waifuCollection(message, user)
      break;
    case "GUILD_TEXT-nomention":
    case "GUILD_TEXT-nomentions":
    case "osu-nomention":
    case "osu-nomentions":
      user.beMentionned = user.beMentionned ? false : true
      message.addResponse(eval(getLoc)("update_notifications"))
      break;
    case "GUILD_TEXT-editname":
    case "interaction-editname":
    case "osu-editname":
      commandStatus = editname(message, user, args, initialMessage)
      break;
    case "GUILD_TEXT-lb":
      commandStatus = lb(message, user, args)
      break;
    case "GUILD_TEXT-rank":
      commandStatus = rank(message, user, initialMessage)
      break;
    case "osu-default":
    case "interaction-defaultwaifu"
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
    case "interaction-exp":
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
    case "osu-quest":
    case "osu-quests":
    case "GUILD_TEXT-quest":
    case "GUILD_TEXT-quests":
      commandStatus = quests(message, user)
      break;
    case "GUILD_TEXT-s":
    case "GUILD_TEXT-stats":
      commandStatus = stats(message, user)
      break;
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
    case "GUILD_TEXT-startdeal":
      commandStatus = startDeal(message, user, initialMessage)
      break;
    case "GUILD_TEXT-replace":
    case "GUILD_TEXT-replacewaifu":
      commandStatus = replaceWaifu(message, user, args)
      break;
    case "GUILD_TEXT-recycle":
      commandStatus = recycle(message, user, args)
      break;
    case "GUILD_TEXT-action":
    case "GUILD_TEXT-actions":
      user.waifus.forEach(waifu => waifu?.testSendMesAction(message, "doing_action"))
      break;
    case "GUILD_TEXT-swap":
      commandStatus = swap(message, user, args)
      break;
    case "GUILD_TEXT-uuc":
    case "GUILD_TEXT-useuserconsumable":
      commandStatus = useUserConsumable(message, user, args)
      break;
    case "GUILD_TEXT-uwc":
    case "GUILD_TEXT-usewaifuconsumable":
      commandStatus = useWaifuConsumable(message, user, args)
      break;
    case "GUILD_TEXT-ewi":
    case "GUILD_TEXT-equipwaifuitem":
      commandStatus = equipWaifuItem(message, user, args)
      break;
    case 'GUILD_TEXT-eui':
    case "GUILD_TEXT-equipuseritem":
      commandStatus = equipUserItem(message, user, args)
      break;

    case "GUILD_TEXT-usexp":
      commandStatus = useWaifuXP(message, user, args)
      break;


    case "GUILD_TEXT-gacha":
      commandStatus = gacha(message, user)
      break;
    case "GUILD_TEXT-create":
    case "GUILD_TEXT-createwaifu":
      commandStatus = createWaifu(message, user, args)
      break;
    case "GUILD_TEXT-f":
    case "GUILD_TEXT-fight":
    case "osu-f":
    case "osu-fight":
      commandStatus = fight(message, user, args)
      break;
    case "GUILD_TEXT-c":
    case "GUILD_TEXT-claim":
    case "osu-claim":
    case "osu-c":
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
      commandStatus = upgradeWaifu(message, user, args)
      break;
    case "GUILD_TEXT-sell":
      commandStatus = sell(message, user, args)
      break;
    case "GUILD_TEXT-shop":
      commandStatus = shop(message, user, args)
      break;
    case "GUILD_TEXT-sortwaifu":
      commandStatus = sortWaifu(message, user, args)
      break;
    case "GUILD_TEXT-buy":
      commandStatus = buy(message, user, args)
      break;
    default:
      message.addResponse(eval(getLoc)("command_not_exist"))
      break;
  }
  //BETTER ALTERNATIVE ?

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
