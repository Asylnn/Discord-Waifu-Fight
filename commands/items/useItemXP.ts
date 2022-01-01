import message from '../../class/message'
import user from '../../class/user'
import waifuEquipment from '../../class/item/waifuEquipment'
import testItem from '../util/testItem'
import Discord from 'discord.js'
import {MAJ} from '../../class/types/itemType'


commandManager.create({
  name:"givewaifuxp",
  type:"CHAT_INPUT",
  description:"c o n s u m e",
  options:[
    {
      name:"amount",
      description:"amount of XP to give",
      required:true,
      type:"INTEGER"
    },{
      name:"i",
      description:"index",
      required:true,
      type:"INTEGER"
    },{
      name:"it",
      description:"item type -- ADD DESCRIPTION",
      required:true,
      type:"STRING",
      choices:[{name:"userconsumable", value:"userconsumable"},
        {name:"waifuconsumable", value:"waifuconsumable"},
        {name:"userequipment", value:"userequipment"},
        {name:"waifuequipment", value:"waifuequipment"},
        {name:"material", value:"material"},
      ],
    }
  ],
})

export default async function useXP(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){
  const index = message.isInteraction ? interaction.options.getInteger('amount')! : Math.floor(parseInt(args[2]) - 1)
  const type = message.isInteraction ? interaction.options.getString('it')! : args[1]
  const amount = message.isInteraction ? interaction.options.getInteger('amount')! : Math.floor(parseInt(args[3]) - 1)

  let item = testItem(message, user.items[MAJ[type as "waifuequipment"]], index) as waifuEquipment
  if(item == null){return true;}

  if(isNaN(amount) || amount < 1){message.addResponse(eval(getLoc)("amount_NaN")); return true;}

  message.addResponse(eval(getLoc)("gived_item_xp"))
  item.giveXP(message, amount)

}
