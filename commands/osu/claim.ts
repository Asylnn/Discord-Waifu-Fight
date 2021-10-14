import message from '../../class/message'
import user from '../../class/user'
import fruitsClaim from './fruitsClaim'
import maniaClaim from './maniaClaim'
import osuClaim from './osuClaim'
import taikoClaim from './taikoClaim'


export default async function claim(message: message, user: user){
  if(user.osuId == 0 || user.osuId == undefined){message.addResponse(eval(getLoc)("no_osu_id")); return true;}
  if(!user.fight.isInAFight){message.addResponse(eval(getLoc)("claim_no_fight")); return true;}
  console.log("CLAIM // username : " + user.osuName)
  switch(user.fight.mode){
    case "osu":
      await osuClaim(message, user)
      break;
    case "taiko":
      await taikoClaim(message, user)
      break;
    case "fruits":
      await fruitsClaim(message, user)
      break;
    case "mania":
      await maniaClaim(message, user)
      break;
  }
}
