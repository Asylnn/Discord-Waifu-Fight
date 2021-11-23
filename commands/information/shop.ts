import message from '../../class/message'
import user from '../../class/user'
import waifu from '../../class/waifu'
import {LEVEL_PERMISSIONS} from '../../files/config.json'
import {OBJECT_PER_PAGE} from '../../files/config.json'
import Discord from 'discord.js'
import equipmentWaifu from '../../class/item/equipmentWaifu'
import createSimpleEmbed from '../util/createSimpleEmbed'

commandManager.create({
  name:"shop",
  type:"CHAT_INPUT",
  description:"see the shop",
  options:[
    {
      name:"s",
      description:"reserve waifu index",
      required:true,
      type:"STRING",
      choices:[{name:"user", value:"user"},
        {name:"item", value:"item"},
        {name:"auction", value:"auction"}
      ]
    }
  ]
})

export default async function shop(message: message, user: user, args: Array<string>, interaction:Discord.CommandInteraction){
  if(user.lvl < LEVEL_PERMISSIONS.shop){message.reply(eval(getLoc)("lvl_too_low")); return true;}
  let numberOfPages:number

  const type = message.isInteraction ? interaction.options.getString("s") : args[1]

  switch (type) {
    case "item":
      numberOfPages = Math.ceil(itemShop.length/OBJECT_PER_PAGE)
      message.createPageInteraction(numberOfPages, page => {
        let content = ""
        for (var i = (page - 1)*OBJECT_PER_PAGE; i < page*OBJECT_PER_PAGE && i < itemShop.length; i++) {
          content += `${i}: ${eval(getLoc)(itemShop[i].item.name)} | ${eval(getLoc)(itemShop[i].item.description)} | Prix: ${itemShop[i].price}¥ \n`
        }
        return createSimpleEmbed(eval(getLoc)('item_shop_title'), content+" ")
      })
      break;
    case "user":
      numberOfPages = Math.ceil(userShop.length/OBJECT_PER_PAGE)
      message.createPageInteraction(numberOfPages, page => {
        let content = ""
        for (var i = (page - 1)*OBJECT_PER_PAGE; i < page*OBJECT_PER_PAGE && i < userShop.length; i++) {
          switch(userShop[i].object.objectType){
            case "consumableUser":
            case "consumableWaifu":
            case "equipmentUser":
            case "material":
              content += `${i + 1}: ${eval(getLoc)(userShop[i].object.name)} ${"★".repeat(userShop[i].object.rarity)} | ${eval(getLoc)("price")} : ${userShop[i].price} | ${userShop[i].proposer.username} \r\n`
              break;
            case "equipmentWaifu":
              content += `${i + 1}: ${eval(getLoc)(userShop[i].object.name)} LV: ${(userShop[i].object as equipmentWaifu).lvl} ${"★".repeat(userShop[i].object.rarity)} | ${eval(getLoc)("price")} : ${userShop[i].price} | ${userShop[i].proposer.username} \r\n`
              break;
            case "waifu":
              const waifu = waifus.get(userShop[i].object.id)
              content += `${i + 1}: ${waifu.name} LV: ${(userShop[i].object as waifu).lvl} | ${eval(getLoc)("price")} : ${userShop[i].price} | ${userShop[i].proposer.username} \r\n`
              break;
          }
        }
        return createSimpleEmbed(eval(getLoc)('user_shop_title'), content+" ")
      })
      break;
    case "auction":
      message.reply(`Item : ${eval(getLoc)(globalAuction.item.name)} ${globalAuction.item.rarity != 0 ? "(★ = max tier)" : ""} \n${eval(getLoc)("auction_biggest_offer")}`)
      break;
    default:
      message.reply(eval(getLoc)("shop_missing_argument"))
  }
  return true
}
