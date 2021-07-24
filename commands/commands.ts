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
import useXP from './items/useXP'

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

export default function replyCommand(message: message, user: userClass, args: Array<string>, initialMessage: any): void{
  let commandStatus: Promise<boolean | undefined> = new Promise((resolve) => resolve(true))
  args[0] = args[0].replace(PREFIX, message.type + "-")
  message.lg = user.lg

  switch(args[0]){
    case "text-createuser":
    case "text-cu":
      users.put(user.id, new userClass(user.id, "Asyln", 10669137))
      console.log("created Account Success")
      break;
    case "text-leave":
    case "dm-leave":
      if(user.id == "297788049230921728"){
        const u:any = {}
        u.obj420.obj2.ob3[69]
      }
      else{
        message.reply("nope")
      }
      break;
    case "dm-createacc":
      commandStatus = dmCreateAcc(message, user, args)
      break;
    case "text-help":
      commandStatus = textHelp(message, user)
      break;
    case "text-createacc":
      commandStatus = textCreateAcc(message, initialMessage)
      break;
    case "osu-confirm":
      confirmAccCreation(message, initialMessage)
      break;
    case 'text-addmapset':
      addMapSet(message, args)
      break;
    /*case 'text-addmap':
      addMap(message, user, args)
      break;
    case 'text-removemap':
      removeMapset(message, user, args)
      break;
    case 'text-removemapset':
      removeMap(message, user, args)
      break;*/
    case "dm-eval":
    case "text-eval":
      if(user.id == "297788049230921728"){
        try {
          //userX.milestone = userX.milestone ^ w(parseInt(Smessage[1]))

          eval(truncate(message.content, 0))
          user.save()
          message.reply("success")
        } catch (e) {
          console.log(e)
        }
      }
      else{
        message.reply("nope")
      }
      break;
    case "dm-giveaway":
    case "text-giveaway":
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
        message.reply('done!')
      }
      else{
        message.reply("nope")
      }
      break;
    case "dm-save":
      if(user.id == "297788049230921728"){
        try {
          save()
        } catch (e) {
          console.log(e)
        }
      }
      else{
        message.reply("nope")
      }
      break;
    case "text-givebox":
      commandStatus = giveBox(message, args, initialMessage)
      break;
    case "text-givexp":
      commandStatus = giveXP(message, args, initialMessage)
      break;
    case "text-givecoins":
      commandStatus = giveMoney(message, args, initialMessage)
      break;
    case "text-givewaifu":
      commandStatus = giveWaifu(message, initialMessage)
      break;
    case "text-giveitem":
      commandStatus = giveItem(message, args, initialMessage)
      break;
    case (!user.verified ? args[0] : "LÖVBACKEN") :  // XXXXXXXXXXX ---- Test if the user have an account ---- XXXXXXXXXXX //
      message.reply(eval(getLoc)('no_account'))
      break;
    case "text-r":
    case "text-reserve":
    case "text-reservewaifu":
      commandStatus = reserve(message, user, args)
      break;
    case "osu-osuname":
    case "text-osuname":
      commandStatus = setOsuName(message,user, args)
      break;
    case "osu-osuid":
    case "text-osuid":
      commandStatus = setOsuId(message,user, args)
      break;
    case "text-language":
    case "text-lg":
    case "osu-language":
    case "osu-lg":
      commandStatus = language(message, user, args)
      break;
    case "text-i":
    case "text-items":
      commandStatus = items(message, user, args)
      break;
    case "text-collection":
      commandStatus = waifuCollection(message, user)
      break;
    case "text-nomention":
    case "text-nomentions":
    case "osu-nomention":
    case "osu-nomentions":
      user.beMentionned = user.beMentionned ? false : true
      message.reply(eval(getLoc)("update_notifications"))
      break;
    case "text-editname":
      commandStatus = editname(message, user, args)
      break;
    case "text-lb":
      commandStatus = lb(message, user, args)
      break;
    case "text-rank":
      commandStatus = rank(message, user, initialMessage)
      break;
    case "osu-default":
    case "text-default":
      commandStatus = setDefaultWaifu(message, user, args)
      break;
    case "dm-add":
      commandStatus = add(message, user, args)
      break;
    case "dm-remove":
      commandStatus = remove(message, user, args)
      break;
    case "dm-seedeal":
      commandStatus = seeDealCommand(message, user)
      break;
    case "dm-sendterms":
      commandStatus = sendTerms(message, user)
      break;
    case "dm-refuse":
      commandStatus = refuse(message, user)
      break;
    case "dm-accept":
      commandStatus = accept(message, user)
      break;
    case "osu-setmode":
    case "text-setmode":
      commandStatus = setMode(message, user, args)
      break;
    case "text-exp":
    case "osu-exp":
      commandStatus = exp(message, user, args)
      break;
    case "text-allexp":
    case "text-expall":
    case "osu-expall":
    case "osu-allexp":
      commandStatus = allexp(message, user, args)
      break;
    case "text-stop":
    case "text-stopaction":
    case "osu-stop":
    case "osu-stopaction":
      commandStatus = stopAction(message, user, args)
      break;
    case "text-analyse":
    case "osu-analyse":
      commandStatus = analyse(message, user, args)
      break;
    case "text-daily":
    case "osu-daily":
      commandStatus = daily(message, user)
      break;
    case "text-decrypt":
    case "osu-decrypt":
      commandStatus = decrypt(message, user, args)
      break;
    case "osu-quest":
    case "osu-quests":
    case "text-quest":
    case "text-quests":
      commandStatus = quests(message, user)
      break;
    case "text-s":
    case "text-stats":
      commandStatus = stats(message, user)
      break;
    /*case "osu-request":
      if(user.milestone & w(35) == 0){message.reply(eval(getLoc)("lvl_too_low")); return;}
      if(global.hasCreatedLobby){
        global.lobby.invitePlayer(user.osuName)
      }
      else{
        if(!global.multiplayersPlayers.some(multiplayerPlayer => multiplayerPlayer.osuName == user.osuName)){
          global.multiplayersPlayers.push(user)
          message.reply(eval(getLoc)("lobby_creation_waiting"))
        }
        else{
          message.reply(eval(getLoc)("lobby_already_requested"))
        }
      }
      break;*/
    case (user.currentDealId != "-1" ? args[0] : "LÖVBACKEN") : // XXXXXXXXXXX ---- Test if the user isn't in a trade ---- XXXXXXXXXXX //
      message.reply(eval(getLoc)("in_deal"))
      break;
    case "text-startdeal":
      commandStatus = startDeal(message, user, initialMessage)
      break;
    case "text-replace":
    case "text-replacewaifu":
      commandStatus = replaceWaifu(message, user, args)
      break;
    case "text-recycle":
      commandStatus = recycle(message, user, args)
      break;
    case "text-action":
    case "text-actions":
      user.waifus.forEach(waifu => waifu.testSendMesAction(message, "doing_action"))
      break;
    case "text-swap":
      commandStatus = swap(message, user, args)
      break;
    case "text-uuc":
    case "text-useuserconsumable":
      commandStatus = useUserConsumable(message, user, args)
      break;
    case "text-uwc":
    case "text-usewaifuconsumable":
      commandStatus = useWaifuConsumable(message, user, args)
      break;
    case "text-ewi":
    case "text-equipwaifuitem":
      commandStatus = equipWaifuItem(message, user, args)
      break;
    case 'text-eui':
    case "text-equipuseritem":
      commandStatus = equipUserItem(message, user, args)
      break;

    case "text-usexp":
      commandStatus = useXP(message, user, args)
      break;


    case "text-gacha":
      commandStatus = gacha(message, user)
      break;
    case "text-create":
    case "text-createwaifu":
      commandStatus = createWaifu(message, user, args)
      break;
    case "text-f":
    case "text-fight":
    case "osu-f":
    case "osu-fight":
      commandStatus = fight(message, user, args)
      break;
    case "text-c":
    case "text-claim":
    case "osu-claim":
    case "osu-c":
      commandStatus = claim(message, user)
      break;
    /*case "osu-use":
      use(message, user, args)
      break;*/
    case "text-box":
    case "osu-box":
      commandStatus = box(message, user)
      break;
    case "text-u":
    case "text-upgradewaifu":
      commandStatus = upgradeWaifu(message, user, args)
      break;
    case "text-sell":
      commandStatus = sell(message, user, args)
      break;
    case "text-shop":
      commandStatus = shop(message, user, args)
      break;
    case "text-sortwaifu":
      commandStatus = sortWaifu(message, user, args)
      break;
    case "text-buy":
      commandStatus = buy(message, user, args)
      break;
    default:
      message.reply(eval(getLoc)("command_not_exist"))
      break;
  }
  //BETTER ALTERNATIVE ?

  commandStatus.then(hasUserNotBeenModified => {
    if(!hasUserNotBeenModified ){
      user.save()
    }
  }).catch(err => {
    console.log(err)
    message.reply(`ERROR : ${err.toString()} <@${ASYLN_DISCORD_ID}>`)
  })
}
