import Discord from 'discord.js'

export default function checkClicker(interaction:Discord.ButtonInteraction, id:string){
  if (interaction.user.id == id) {
    return true
  }
  else {
    interaction.reply({ content: `These buttons aren't for you!`, ephemeral: true });
    return false
  }
}
