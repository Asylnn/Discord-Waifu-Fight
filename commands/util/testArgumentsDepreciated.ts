/*import message from '../../class/message'
import user from '../../class/user'
import {MAJ} from '../../class/types/itemType'

type testType = 'validWaifu' | 'validReserveWaifu' | 'validItem' | 'validItemType'
type itemTypeLowerCase = 'consumablewaifu' | 'consumableuser' | 'equipmentuser' | 'equipmentwaifu' | 'materials'

export default function testArg(message: message, user: user, arg: number , testtype: testType, itemType?: itemTypeLowerCase){
  let isValid = false
  switch(testtype){
    case "validWaifu" :
      switch (true) {
        case isNaN(arg):
          message.addResponse(eval(getLoc)("waifu_invalid_no_arg"))
          break;
        case arg < 0:
        case arg >= user.waifus.length:
          message.addResponse(eval(getLoc)("waifu_invalid"))
          break;
        case user.waifus[arg].id == "-1":
          message.addResponse(eval(getLoc)("waifu_invalid_no_waifu"))
          break;
        default:
          isValid = true
          break;
      }
      break;
    case "validReserveWaifu":
      switch(true) {
        case isNaN(arg):
          message.addResponse(eval(getLoc)("reservewaifu_invalid_no_arg"))
          break;
        case 0 > arg:
        case arg >= user.reserveWaifu.length:
          message.addResponse(eval(getLoc)("reservewaifu_invalid"))
          break;
        default:
          isValid = true
          break;
      }
      break;
    case "validItem":
      switch(true) {
        case isNaN(arg):
        case itemType == undefined:
          message.addResponse(eval(getLoc)("item_invalid_no_arg"))
          break;
        case 0 > arg:
        case arg >= user.items[MAJ[itemType as itemTypeLowerCase]].length:
          message.addResponse(eval(getLoc)("item_invalid"))
          break;
        default:

          isValid = true
          break;
      }
      break;
      case "validItemType":
      if(['userconsumable' , 'waifuconsumable' , 'useritem' , 'waifuitem' , 'materials'].includes(itemType as itemTypeLowerCase)){
        isValid = true
      }
      else{
        message.addResponse(eval(getLoc)("invalid_item_type"))
      }
      break;
    default:
      message.addResponse("A error Happened (testArguments.ts)")
      break;
  }
  return isValid
}
*/
