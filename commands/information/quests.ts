import message from '../../class/message'
import user from '../../class/user'

commandManager?.create({
  name:"quests",
  type:"CHAT_INPUT",
  description:"show your active quests",
})

export default async function quests(message: message, user: user){
  let mes = ""

  user.quests.activeQuests.forEach((quest) =>{
    if(quest.name != "completed"){
      mes += `${eval(getLoc)(quest.name)} ${"★".repeat(quest.difficulty)} | ${eval(getLoc)(quest.type)} | ${eval(getLoc)("quest_state")} : ${Math.round(quest.state)}/${Math.round(quest.objective)} \n`
    }
    else{
      mes += `${eval(getLoc)(quest.name)} \n`
    }
  });
  message.reply(mes)
  return true
}
