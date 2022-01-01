

export default abstract class item {
  public readonly objectType: string = ""
  public readonly id: string
  public readonly name: string
  public readonly description: string
  /*public effects: Array<{effect:effectType, value:any}> = []
  public modificators: Array<modificator> = []*/
  public readonly rarity: number
  public value: number
  public readonly img: string
  public readonly uniqueId: string

  constructor(id = "-1", name = "noName", description = "noDesc", rarity = 0, value = -69, img = ""){
    this.id = id
    this.name = name
    this.description = description
    this.rarity = rarity
    this.value = value
    this.img = img
    this.uniqueId = uniqueId
    uniqueId = (+uniqueId+1).toString()
  }
}



/*message.addResponse(eval(getLoc)("equiping_item"))
message.addResponse(eval(getLoc)("waifu_already_equiped_item"))
message.addResponse(eval(getLoc)("waifu_unequiping_item"))
message.addResponse(eval(getLoc)("waifu_equiping_item"))*/
