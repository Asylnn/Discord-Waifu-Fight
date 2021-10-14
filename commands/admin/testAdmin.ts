import message from '../../class/message'

export default function testAdmin(message:message, discordMessage: any){
  if(!discordMessage.member.roles.highest.permissions.has("BAN_MEMBERS"))
  {message.addResponse(eval(getLoc)("has_not_discord_permission")); return true;}
  if(!discordMessage.mentions.users.firstKey())
  {message.addResponse("Mention someone"); return true;}

  return false
}
