import messageClass from '../class/message'
import checkActions from './actions'
import checkAchievements from './achievments'
import checkQuests from './quests'
import checkShop from './shop'
import {ASYLN_DISCORD_ID} from '../files/config.json'
import sleep from '../genericFunctions/sleep'

export default async function check(){
  const message = new messageClass(defaultLanguage, "", "text", -1, eventDiscordChannel, "-1");
  (await users.all()).forEach(user => {
    const userMention = user.beMentionned ? guild.members.cache.get(user.id) : user.osuName
    message.lg = user.lg
    checkActions(user, message, userMention)
    checkQuests(user, message, userMention)
    checkAchievements(user, message, userMention)
  })
  checkShop(message)
  await sleep(5000)
  check().catch(err => {
    console.log(err)
    message.reply(`ERROR : ${err.toString()} <@${ASYLN_DISCORD_ID}>`)
  })
}
