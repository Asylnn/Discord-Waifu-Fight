import message from '../../class/message'
import user from '../../class/user'
import fruitsClaim from './fruitsClaim'
import maniaClaim from './maniaClaim'
import osuClaim from './osuClaim'
import taikoClaim from './taikoClaim'
import giveClaimXP from './giveClaimXP'

export default async function claim(message: message, user: user){
  if(user.osuId == 0 || user.osuId == undefined){message.addResponse(eval(getLoc)("no_osu_id")); return true;}
  if(!user.fight.isInAFight){message.addResponse(eval(getLoc)("claim_no_fight")); return true;}
  console.log("CLAIM // username : " + user.osuName)
  let rawXP: number
  switch(user.fight.mode){
    case "osu":
      rawXP = await osuClaim(message, user.osuId, user.fight.beatmapId)
      break;
    case "taiko":
      rawXP = await taikoClaim(message, user.osuId, user.fight.beatmapId)
      break;
    case "fruits":
      rawXP = await fruitsClaim(message, user.osuId, user.fight.beatmapId)
      break;
    case "mania":
      rawXP = await maniaClaim(message, user.osuId, user.fight.beatmapId)
      break;
  }
  if(rawXP != 0){
    giveClaimXP(message, user, rawXP, user.fight.mode)
  }
}
