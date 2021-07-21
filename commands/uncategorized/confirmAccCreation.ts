import message from '../../class/message'
import userClass from '../../class/user'
import waifu from '../../class/waifu'
import truncate from '../../genericFunctions/truncate'
import randInt from '../../genericFunctions/randInt'

export default async function confirm(message: message, initialMessage: any){
  const pendingIndex = pendingAccount.findIndex(pending => pending.osuName == initialMessage.user.ircUsername)
  if(pendingIndex == -1){message.reply(en.no_account_in_creation); return true;}
  const pending = pendingAccount[pendingIndex]

  if(pending.code != truncate(message.content, 0)){message.reply(en.wrong_code); return true;}
  const user = new userClass(pending.id, pending.osuName, initialMessage.id)

  switch(randInt(3)){
    case 0:
      user.waifus[0] = new waifu(user, waifus.get("1"))
      break;
    case 1:
      user.waifus[0] = new waifu(user, waifus.get("12"))
      break;
    case 2:
      user.waifus[0] = new waifu(user, waifus.get("13"))
      break;
  }

  users.put(user.id, user)
  message.reply(en.created_account)
  pendingAccount.splice(pendingIndex)
  nameToId.put(user.osuName, user.id)
}
