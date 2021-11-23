import message from '../../class/message'
import user from '../../class/user'
import Discord from 'discord.js'
import createSimpleEmbed from '../util/createSimpleEmbed'
import getModificators from '../../genericFunctions/getModificators'

commandManager?.create({
  name:"stats",
  type:"USER",
})

commandManager?.create({
  name:"stats",
  type:"CHAT_INPUT",
  description:"all the information you need!",
  options:[{
    name:"user",
    description:"person you want to see the rank of (default is you)",
    required:false,
    type:"USER"
  }],
})

export default async function rank(message: message, user: user, discordMessage: Discord.CommandInteraction | Discord.ContextMenuInteraction | Discord.Message){
  let rank = 1, title, discordUser: Discord.User
  let mention = false
  let userId = ""

  const lvl = user.lvl;
  (await users.all()).forEach((user: user) => {if(user.lvl > lvl){rank++}})

  if(discordMessage instanceof Discord.CommandInteraction || discordMessage instanceof Discord.ContextMenuInteraction){
    if(discordMessage.isContextMenu()){
      userId = discordMessage.targetId
      console.log(discordClient)
      discordUser = discordClient.users.cache.get(userId)
    }
    else {
      if(discordMessage.options.getUser("user")){
        userId = discordMessage.options.getUser("user")!.id
        discordUser = discordClient.users.cache.get(userId)
      }
      else {
        discordUser = discordMessage.user
      }
    }
  }
  else {
    if(discordMessage.mentions.users.firstKey()/* && await users.exists(discordMessage.mentions.users.first().id)*/){
      discordUser = discordMessage.mentions.users.first()!
      mention = true
    }
    else{
      discordUser = discordMessage.author
    }
  }

  const thumbnail = discordUser.displayAvatarURL({size: 1024, dynamic: true}) || discordUser.defaultAvatarURL
  if(userId){
    if(!(await users.exists(userId))){message.addResponse(eval(getLoc)("arg_no_account")); return true;}
    user = await users.get(userId)
  }
  title = eval(getLoc)("rank_of")

  const embed = createSimpleEmbed(title, " ")
  embed.setThumbnail(thumbnail) //the pfp
  embed.addField("Stats",
    `${mention ? eval(getLoc)("rank_of") : eval(getLoc)("your_rank")}
    ${eval(getLoc)("rank")} : ${rank}/${(await users.all()).length} \n
    ${eval(getLoc)("your_level")} : ${user.lvl}
    XP : ${user.xp}/${user.xplvlup}

    ${eval(getLoc)("pure_xp")} : ${user.waifuXP} \n

    claims std : ${user.playCount.osu}
    claims mania : ${user.playCount.mania}
    claims catch : ${user.playCount.fruits}
    claims taiko : ${user.playCount.taiko}

    ${eval(getLoc)("box_level")} : ${user.boxLevel}
    ${eval(getLoc)("ana_level")} : ${user.anaLevel}
    ${eval(getLoc)("par_level")} : ${user.parLevel}
    ${eval(getLoc)("box_number")} : ${user.boxs.length}


    ${eval(getLoc)("total_claim")} : ${user.totalClaims} \n
    ${eval(getLoc)("total_quest")} : ${user.quests.totalQuestDone}`
  )

  let content = ""

  content += eval(getLoc)("stats_header")
  user.equipedItems.forEach((item, i) => {
      content += `${eval(getLoc)("item")} ${i+1}: `
    if(item != null) content += eval(getLoc)(item.name) + "★".repeat(item.rarity) + "\n"
    else content += eval(getLoc)("no_item") + "\n"
  })

  content += eval(getLoc)("stats_modificator")

  let userXPmult = getModificators(user, 'mult_XP')

  let userBoxadd = getModificators(user, 'add_box_level')
  let hasNakanoBonus = getModificators(user, 'nakano_bonus')
  let userMoneymult = getModificators(user, 'mult_money_earned')

  let userEXmult = getModificators(user, 'mult_EX')
  let userIntMult = getModificators(user, 'mult_int')

  let userXPstdMult = getModificators(user, 'mult_XP_std')
  let userXPmaniaMult = getModificators(user, 'mult_XP_mania')
  let userXPcatchMult = getModificators(user, 'mult_XP_catch')
  let userXPtaikoMult = getModificators(user, 'mult_XP_taiko')

  if(userXPmult != 1){content += `${eval(getLoc)("incr_xp_gain")} : ${Math.round(userXPmult*100 - 100)}% \n`}
  if(userXPstdMult != 1){content += `${eval(getLoc)("incr_xp_gain_std")} : ${Math.round(userXPstdMult*100 - 100)}% \n`}
  if(userXPmaniaMult != 1){content += `${eval(getLoc)("incr_xp_gain_mania")} : ${Math.round(userXPmaniaMult*100 - 100)}% \n`}
  if(userXPcatchMult != 1){content += `${eval(getLoc)("incr_xp_gain_catch")} : ${Math.round(userXPcatchMult*100 - 100)}% \n`}
  if(userXPtaikoMult != 1){content += `${eval(getLoc)("incr_xp_gain_taiko")} : ${Math.round(userXPtaikoMult*100 - 100)}% \n`}

  if(userEXmult != 1){content += `${eval(getLoc)("incr_ex_gain")} : ${Math.round(userEXmult*100 - 100)}% \n`}
  if(userIntMult != 1){content += `${eval(getLoc)("incr_int_gain")} : ${Math.round(userIntMult*100 - 100)}% \n`}

  if(userBoxadd != 0){content += `${eval(getLoc)("incr_luck_box")} \n`}
  if(userMoneymult != 1){content += `${eval(getLoc)("incr_coins_gain")} : ${Math.round(userMoneymult*100 - 100)}% \n`}
  if(hasNakanoBonus != 0){content += `${eval(getLoc)("nakano_bonus")}`}

  embed.setDescription(content)
  message.embeds.push(embed)
  return true
}
