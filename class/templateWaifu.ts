import message from './message'
import Discord from 'discord.js'


export default class templateWaifu {
  public readonly id: string
  public imgURL: string
  public name: string
  public readonly o_stg: number
  public readonly o_agi: number
  public readonly o_int: number
  public readonly o_luck: number
  public readonly o_dext: number
  public readonly o_kaw: number
  public readonly u_stg: number
  public readonly u_agi: number
  public readonly u_int: number
  public readonly u_luck: number
  public readonly u_dext: number
  public readonly u_kaw: number
  public readonly rarity: number
  public readonly value: number
  public readonly isTradable: boolean

  constructor(args: {id: string, imgURL: string, name: string, o_stg: number, o_agi: number, o_int: number, o_luck: number, o_dext: number, o_kaw: number,
    u_stg: number, u_agi: number, u_int: number, u_luck: number, u_dext: number, u_kaw: number, rarity:number, value:number, isTradable:boolean}){
    this.id = args.id
    this.imgURL = args.imgURL
    this.name = args.name
    this.o_stg = args.o_stg
    this.o_agi = args.o_agi
    this.o_int = args.o_int
    this.o_luck = args.o_luck
    this.o_dext = args.o_dext
    this.o_kaw = args.o_kaw
    this.u_stg = args.u_stg
    this.u_agi = args.u_agi
    this.u_int = args.u_int
    this.u_luck = args.u_luck
    this.u_dext = args.u_dext
    this.u_kaw = args.u_kaw
    this.rarity = args.rarity
    this.value = args.value
    this.isTradable = args.isTradable
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
      `AGI : ${this.o_agi} \n
      LUCK : ${this.o_luck} \n
      INT : ${this.o_int} \n
      STG : ${this.o_stg} \n
      DEXT : ${this.o_dext} \n
      KAWAIINESS : ${this.o_kaw} \n
      ${eval(getLoc)("rarity")} : ${this.rarityName(message)} \n
      ${eval(getLoc)("rarity")} : ${this.value}¥`)
    return embed
  }
}
