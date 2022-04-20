import message from '../../class/message'

export default function testArg<type>(message: message, items: Array<{item:type, qty:number}>, index: number){

  switch(true) {
    case isNaN(index):
      message.addResponse(eval(getLoc)("item_invalid_no_arg"))
      break;
    case 0 > index:
    case index >= items.length:
      message.addResponse(eval(getLoc)("item_invalid"))
      return null
  }
  return items[index]
}
