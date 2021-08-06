export default abstract class item {
  public readonly id: string
  public readonly name: string
  public readonly description: string
  /*public effects: Array<{effect:effectType, value:any}> = []
  public modificators: Array<modificator> = []*/
  public readonly rarity: number
  public value: number
  public readonly img: string

  constructor(id = "-1", name = "noName", description = "noDesc", rarity = 0, value = -69, img = ""){
    this.id = id
    this.name = name
    this.description = description
    this.rarity = rarity
    this.value = value
    this.img = img
  }
}



/*message.reply(eval(getLoc)("equiping_item"))
message.reply(eval(getLoc)("waifu_already_equiped_item"))
message.reply(eval(getLoc)("waifu_unequiping_item"))
message.reply(eval(getLoc)("waifu_equiping_item"))*/
