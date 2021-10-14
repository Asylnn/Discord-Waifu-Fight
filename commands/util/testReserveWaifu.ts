import message from '../../class/message'
import waifu from '../../class/waifu'

export default function testArg(message: message, waifus: Array<waifu | null>, index: number){
  switch (true) {
    case isNaN(index):
      message.addResponse(eval(getLoc)("reservewaifu_invalid_no_arg"))
      return null
    case index < 0:
    case index >= waifus.length:
      message.addResponse(eval(getLoc)("reservewaifu_invalid"))
      return null
  }

  return waifus[index]
}
