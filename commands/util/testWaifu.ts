import message from '../../class/message'
import waifu from '../../class/waifu'

export default function testArg(message: message, waifus: Array<waifu | null>, index: number){
    switch (true) {
      case isNaN(index):
        message.reply(eval(getLoc)("waifu_invalid_no_arg"))
        break;
      case index < 0:
      case index >= waifus.length:
        message.reply(eval(getLoc)("waifu_invalid"))
        break;
      case waifus[index] == null :
        message.reply(eval(getLoc)("waifu_invalid_no_waifu"))
        break;
    }
    return waifus[index]
}
