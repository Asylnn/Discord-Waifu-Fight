import message from '../../class/message'
import user from '../../class/user'
import createSimpleEmbed from '../util/createSimpleEmbed'
import randInt from '../../genericFunctions/randInt'
import waifu from '../../class/waifu'

commandManager?.create({
  name:"gacha",
  type:"CHAT_INPUT",
  description:"open gacha menu"
})

export default async function gacha(message:message, user:user){
  const numberOfPages = Math.ceil(banners.length)
  let qty = 1
  message.addButton('pull1', 'Pull 1',  'SUCCESS')
  message.addButton('pull10', 'Pull 10',  'SUCCESS')

  message.createPageInteraction(numberOfPages, (page, interaction) => {
    const banner = banners[page-1]
    if(interaction?.customId == "pull1" || interaction?.customId == "pull10"){
      if(interaction.customId == "pull10") qty = 10

      if(banner.cost*qty > user.gachaCurrency){interaction.reply({content:eval(getLoc)("not_enough_gacha_currency"), ephemeral:true})}
      else{

        user.gachaCurrency -= banner.cost*qty
        const totWeight = banner.dropRates.reduce((tot, weight) => tot + weight)
        const pulledWaifus = []


        for(var i = 0; i < qty; i++){
          const rand = randInt(totWeight)


          for(var j = 0; true; j++){
            const currentWeight = banner.dropRates.reduce((tot, weight, k) => (Math.max(j - k + 1, 0) && weight) + tot) //i*j*(i*j - i - j + 1) + i - j + 1

            if(currentWeight > rand){
              const waifus = banner.waifus.filter(({tier}) => tier == j).map(({waifu}) => waifu)
              pulledWaifus.push(waifus[randInt(waifus.length)])
              break;
            }
          }
        }

        let content
        let embeds = []
        if(pulledWaifus.length == 1){
          embeds.push(pulledWaifus[0].show(message, false))
          content = " "
        }
        else{
          content = "Obtained Waifus \r\n" + pulledWaifus.reduce((str, waifu) => str + `${waifu.rarityName(message)} ${waifu.name}\r\n`, "")
        }
        //message.hasReplied = false
        interaction.reply({content:content, embeds: embeds, ephemeral: user.ephemeral});
        user.reserveWaifu.push(...pulledWaifus.map(template => new waifu(user, template)))
        user.save()
      }
    }

    return createSimpleEmbed(eval(getLoc)(banner.name), eval(getLoc)(banner.description))
  })


  return false
}
