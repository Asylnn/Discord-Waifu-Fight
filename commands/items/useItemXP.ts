import message from '../../class/message'
import user from '../../class/user'
import testItem from '../util/testItem'
import Discord from 'discord.js'


commandManager.create({
  name:"useitemxp",
  type:"CHAT_INPUT",
  description:"c o n s u m e",
  options:[
    {
      name:"amount",
      description:"amount of XP to give",
      required:true,
      type:"INTEGER"
    },{
      name:"slot",
      description:"item slot",
      required:true,
      type:"INTEGER"
    },
  ],
})

export default async function useXP(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){
  const index = message.isInteraction ? interaction.options.getInteger('slot')! : Math.floor(+args[1] - 1)
  console.log(index)
  let item = testItem(message, user.items.waifuEquipment, index)?.item

  if(!item) return true

  const amount = message.isInteraction ? interaction.options.getInteger('amount')! : Math.floor(+args[2])

  if(isNaN(amount) || amount < 1){message.addResponse(eval(getLoc)("amount_NaN")); return true;}


  message.addResponse(eval(getLoc)("gived_item_xp"))
  item.giveXP(message, amount)

}
