import Message from '../../class/message'
import {MAJ} from '../../class/types/itemType'

export default function testArg(message: Message, itemType: string): "userConsumable" | "userEquipment" | "waifuEquipment" | "waifuConsumable" | "material" | null{
    if(['userconsumable' , 'waifuconsumable' , 'userequipment' , 'waifuequipment' , 'material'].includes(itemType)){
      return MAJ[itemType as 'material']
    }
    else if(["uc", "wc", "ue", "we", "m"].includes(itemType)){
      if(itemType == "uc") return "userConsumable"
      if(itemType == "wc") return "waifuConsumable"
      if(itemType == "ue") return "userEquipment"
      if(itemType == "we") return "waifuEquipment"
      if(itemType == "m") return "material"
      return "material" // only to make ts happy
    }
    else {
      message.addResponse(eval(getLoc)("invalid_item_type"))
      return null
    }
}
