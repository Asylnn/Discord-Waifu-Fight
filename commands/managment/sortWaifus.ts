import message from '../../class/message'
import user from '../../class/user'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import Discord from 'discord.js'

commandManager.create({
  name:"sortwaifu",
  type:"CHAT_INPUT",
  description:"sort waifus in the reserve",
  options:[
    {
      name:"criteria",
      description:"the sorting criteria",
      required:true,
      type:"STRING",
      choices:[{name:"int", value:"int"},
        {name:"luck", value:"luck"},
        {name:"stg", value:"stg"},
        {name:"stars", value:"stars"},
        {name:"rarity", value:"rarity"},
        {name:"lvl", value:"lvl"},
        {name:"name", value:"name"},
        {name:"dext", value:"dext"},
        {name:"agi", value:"agi"},
        {name:"kaw", value:"kaw"},
      ]
    }
  ]
})

export default async function sortWaifu(message: message, user: user, args: Array<string>, interaction: Discord.CommandInteraction){
  const sortingCriteria = message.isInteraction ? interaction.options.getString("criteria")! : args[1]


  if(user.lvl < LEVEL_PERMISSIONS.sortWaifu){message.addResponse(eval(getLoc)("lvl_too_low")); return true;}
  if(!["int", "luck", "ex", "lvl", "stars", "rarity","name","agi","kaw","dext"].includes(sortingCriteria)){message.addResponse(eval(getLoc)("sort_waifu_missing_argument")); return true;}
  switch(args[1]){
    case "name":
      user.reserveWaifu.sort((waifuA, waifuB) =>{
        if(waifuA.name < waifuB.name) { return 1; }
        if(waifuA.name > waifuB.name) { return -1; }
        return 0;
      });
      break;
    case "rarity":
      user.reserveWaifu.sort((waifuA, waifuB) => waifuA.rarity - waifuB.rarity) //for everyuser
      break;
    case "stars":
      user.reserveWaifu.sort((waifuA, waifuB) => waifuA.stars - waifuB.stars)
      break;
    case "lvl":
      user.reserveWaifu.sort((waifuA, waifuB) => waifuA.lvl - waifuB.lvl)
      break;
    case "int":
      user.reserveWaifu.sort((waifuA, waifuB) => waifuA.int - waifuB.int)
      break;
    case "luck":
      user.reserveWaifu.sort((waifuA, waifuB) => waifuA.luck - waifuB.luck)
      break;
  }
  message.addResponse(eval(getLoc)("waifus_sorted"))
}
