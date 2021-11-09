import message from '../../class/message'

export default function testArg(message: message, itemType: string){
    if(['userconsumable' , 'waifuconsumable' , 'useritem' , 'waifuitem' , 'materials'].includes(itemType)){
      return true
    }
    else{
      message.addResponse(eval(getLoc)("invalid_item_type"))
      return false
    }
}
