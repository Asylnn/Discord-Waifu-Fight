import message from '../../class/message'
import user from '../../class/user'
import Discord from 'discord.js'

export default async function rank(message: message, user: user, discordMessage: any){
  let rank = 1, title, thumbnail
  let mention = false
  if(discordMessage.mentions.users.firstKey()/* && await users.exists(discordMessage.mentions.users.first().id)*/){
    user = await users.get(discordMessage.mentions.users.first().id)
    title = eval(getLoc)("rank_of")
    thumbnail = discordMessage.mentions.users.first().avatarURL
    mention = true
  }
  else{
    thumbnail = discordMessage.author.avatarURL
    title = eval(getLoc)("your_rank")
  }
  const lvl = user.lvl;
  (await users.all()).forEach((user: user) => {if(user.lvl > lvl){rank++}})

  let embed = new Discord.MessageEmbed(); //a new embed
  embed.setThumbnail(thumbnail as string) //the pfp
  embed.setColor(0x35A7BF)
  embed.setTitle(title)
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
    ${eval(getLoc)("total_quest")} : ${user.quests.totalQuestDone}`)

  message.reply(embed)
  return true
}
