import message from './message'
import Discord from 'discord.js'

export default class templateWaifu {
  public readonly id: string
  public imgURL: string
  public name: string
  public readonly diffLvlUp: number
  public readonly o_exp: number
  public readonly o_int: number
  public readonly o_luck: number
  public readonly u_exp: number
  public readonly u_int: number
  public readonly rarity: number
  public readonly value: number
  public readonly isTradable: boolean

  static whichNakano(waifu: templateWaifu){
    if(waifu.id == "23"){return 1}
    else if(waifu.id == "24"){return 2}
    else if(waifu.id == "25"){return 4}
    else if(waifu.id == "26"){return 8}
    else if(waifu.id == "28"){return 16}
    else{return 0}
  }

  static whichOsu(waifu: templateWaifu){
    if(waifu.id == "30"){return 1}
    else if(waifu.id == "31"){return 2}
    else if(waifu.id == "32"){return 4}
    else if(waifu.id == "33"){return 8}
    else{return 0}
  }

  static whichBase(waifu: templateWaifu){
    if(waifu.id == "1"){return 1}
    else if(waifu.id == "12"){return 2}
    else if(waifu.id == "13"){return 4}
    else{return 0}
  }

  constructor(id: string = "-1", imgURL: string = "", name: string = "za true waifu", diffLvlUp: number = 69, o_exp: number = 0, u_exp:number = 0, rarity:number = 5, value:number = -10000, o_luck:number = 0, o_int:number = 0, u_int:number = 0, isTradable:boolean = false){
    this.id = id
    this.imgURL = imgURL
    this.name = name
	  this.diffLvlUp = diffLvlUp
    this.o_exp = o_exp
    this.u_exp = u_exp
    this.rarity = rarity
    this.value = value
    this.o_luck = o_luck
    this.o_int = o_int
    this.u_int = u_int
    this.isTradable = isTradable
  }

  get whichNakano(){
    if(this.id == "23"){return 1}
    else if(this.id == "24"){return 2}
    else if(this.id == "25"){return 4}
    else if(this.id == "26"){return 8}
    else if(this.id == "28"){return 16}
    else{return 0}
  }

  get whichOsu(){
    if(this.id == "30"){return 1}
    else if(this.id == "31"){return 2}
    else if(this.id == "32"){return 4}
    else if(this.id == "33"){return 8}
    else{return 0}
  }

  get whichBase(){
    if(this.id == "1"){return 1}
    else if(this.id == "12"){return 2}
    else if(this.id == "13"){return 4}
    else{return 0}
  }

  rarityName(message: message){
    message
    return eval(getLoc)("rarity"+this.rarity);
  }

  get rarityColor(){
    if(this.rarity == 1){return 0xC9CAFF;}
    else if(this.rarity == 2){return 0x35A7BF;}
    else if(this.rarity == 3){return 0x1B21F9;}
    else if(this.rarity == 4){return 0x923FF9;}
    else if(this.rarity == 5){return 0xFF0008;}
  }

  show(message: message, userHaveWaifu: boolean){
    var embed = new Discord.MessageEmbed(); //a new embed
    embed.setColor(this.rarityColor as any)
    embed.setThumbnail(this.imgURL) //the pfp
    embed.setTitle(`${this.name} ${userHaveWaifu ? "✅" : ""}` )
    embed.addField("Stats", //the title of the embed
      `EX : ${this.o_exp} \n
      LUCK : ${this.o_luck}% \n
      INT : ${this.o_int} \n
      ${eval(getLoc)("rarity")} : ${this.rarityName(message)} \n
      ${eval(getLoc)("rarity")} : ${this.value}¥`)
    message.reply(embed as any)
  }
}
