import templateWaifu from "../templateWaifu"
interface banner{
  id: string,
  name : string,
  dropRates: [number,number,number],
  waifus:Array<{waifu:templateWaifu, tier:number}>
  focusWaifus : Array<{waifu:templateWaifu, focusMultiplier:number}> | null,
  startingDate : number,
  duration : number,
  imgURL : string,
  description : string,
  cost: number
}
export default banner
