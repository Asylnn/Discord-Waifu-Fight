import message from '../../class/message'
import user from '../../class/user'


export default async function abandonDungeon(message: message, user: user){
  if(!user.isDoingDungeon){message.addResponse(eval(getLoc)("abandon_dungeon_not_in_dungeon")); return true}

  dungeons.get(user.id).delete()
  user.isDoingDungeon = false
  message.addResponse(eval(getLoc)("abandonned_dungeon"))
}
