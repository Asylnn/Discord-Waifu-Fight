import message from '../../class/message'
import userClass from '../../class/user'
import truncate from '../../genericFunctions/truncate'

export default async function confirm(message: message, initialMessage: any){
  const pendingIndex = pendingAccount.findIndex(pending => pending.osuName == initialMessage.user.ircUsername)
  if(pendingIndex == -1){message.reply(en.no_account_in_creation); return true;}
  const pending = pendingAccount[pendingIndex]

  if(pending.code != truncate(message.content, 0)){message.reply(en.wrong_code); return true;}
  const user = new userClass(pending.id, pending.osuName, initialMessage.id)

  users.put(user.id, user)
  message.reply(en.created_account)
  pendingAccount.splice(pendingIndex)
}
