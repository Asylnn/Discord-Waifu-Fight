import message from '../../class/message'
import user from '../../class/user'
import {ALL_LANGUAGES} from '../../files/config.json'

export default async function language(message: message, user: user, args: Array<string>){
  if(!ALL_LANGUAGES.includes(args[1])){message.reply(eval(getLoc)("language_not_exist")); return true}
  user.lg = args[1] + "."
  message.reply(eval(getLoc)("language_edit"))
}
