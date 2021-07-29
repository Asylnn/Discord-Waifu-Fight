import user from '../../class/user'
import message from '../../class/message'


export default async function claimDungeon(message: message, user: user, args: Array<string>){
  if(!dungeons.exists(user.id)){message.reply("you_are_not_in_a_dungeon"); return true;}
  const dungeon = dungeons.get(user.id)
  const score = osuAPI.getBeatmap({beatmapId:dungeon.mapId})
}
