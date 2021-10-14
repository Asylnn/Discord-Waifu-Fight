import message from '../../class/message'
type itemTypeLowerCase = 'consumablewaifu' | 'consumableuser' | 'equipmentuser' | 'equipmentwaifu' | 'materials'

export default function testArg(message: message, itemType: itemTypeLowerCase){
    if(['userconsumable' , 'waifuconsumable' , 'useritem' , 'waifuitem' , 'materials'].includes(itemType)){
      return true
    }
    else{
      message.addResponse(eval(getLoc)("invalid_item_type"))
      return false
    }
}
