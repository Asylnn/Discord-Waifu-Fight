import message from '../../class/message'
import userClass from '../../class/user'
import truncate from '../../genericFunctions/truncate'

export default async function confirm(message: message, initialMessage: any){
  const pending = pendingAccount.find(pending => pending.osuName == initialMessage.user.ircUsername)
  if(!pending){message.addResponse(en.no_account_in_creation); return true;}

  if(pending.code != truncate(message.content, 0)){message.addResponse(en.wrong_code); return true;}
  const user = new userClass(pending.id, pending.osuName)

  users.put(user.id, user)
  message.addResponse(en.created_account)
  pendingAccount.splice(pendingAccount.indexOf(pending))
}
