import message from '../../class/message'
import user from '../../class/user'
import makeCode from '../../genericFunctions/makeCode'
import truncate from '../../genericFunctions/truncate'
import {ACCOUNT_URL} from '../../files/config.json'

export default async function dmCreateacc(message: message, user: user, args: Array<string>){
  if((await users.exists(user.id) && user.verified)){message.addResponse(en.already_has_account); return true;}
  if(args.length == 1){message.addResponse(en.create_acc_no_osu_name); return true}
  let pendAccIndex = pendingAccount.findIndex((pendAcc) => pendAcc.id == user.id)
  if(pendAccIndex != -1){pendingAccount.splice(pendAccIndex)}
  let code = makeCode(10);

  pendingAccount.push({osuName:truncate(message.content, 0), code:code, id:user.id})
  message.addResponse(eval('`' + en.create_acc_finalisation + '`'))
  message.addResponse(ACCOUNT_URL)
  return true
}
