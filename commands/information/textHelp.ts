import message from '../../class/message'
import user from '../../class/user'


import seeHelp from './seeHelp'

export default async function textHelp(message: message, user: user){
  seeHelp(message, {userLvl:user.lvl}, 1, user.id, true)
  return true
}
