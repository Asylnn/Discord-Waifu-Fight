import message from '../../class/message'
import user from '../../class/user'
import Discord from 'discord.js'
import createSimpleEmbed from '../util/createSimpleEmbed'
import Modificator from '../../class/modificator'
const {getModificators} = Modificator

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
    ${eval(getLoc)("item_xp")} : ${user.itemXP} \n

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


  content += getModificators(user, 'nakano_bonus').value == 1 ? getModificators(user, 'nakano_bonus').toString(message) : ""
  content += getModificators(user, 'reduce_analyse_time').value != 1 ? getModificators(user, 'reduce_analyse_time').toString(message) : ""
  content += getModificators(user, 'reduce_decrypt_time').value != 1 ? getModificators(user, 'reduce_decrypt_time').toString(message) : ""
  content += getModificators(user, 'reduce_mining_time').value != 1 ? getModificators(user, 'reduce_mining_time').toString(message) : ""
  content += getModificators(user, 'reduce_cafe_time').value != 1 ? getModificators(user, 'reduce_cafe_time').toString(message) : ""

  embed.setDescription(content)
  message.embeds.push(embed)
  return true
}
