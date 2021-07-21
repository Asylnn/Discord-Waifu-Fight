import user from './user'
import templateWaifu from './templateWaifu'

export default class waifuManager {
  public readonly objectType = "waifuManager"
  public readonly owner

  constructor(owner: user){
    this.owner = owner
  }

  get haveAllNakano(){
    let nakano = 0
    this.owner.reserveWaifu.forEach(waifu => {
      nakano = nakano | templateWaifu.whichNakano(waifu)
    })
    return (nakano | 0x1F) == nakano
  }

  get haveAllBase(){
    let base = 0
    this.owner.reserveWaifu.forEach(waifu => {
      base = base | waifu.whichBase
    })

    return (base | 7) == base
  }

  get haveAllOsu(){
    let osu = 0
    this.owner.reserveWaifu.forEach(waifu => {
      osu = osu | waifu.whichOsu
    })

    return (osu | 0xF) == osu
  }
}
