import templateWaifu from "../templateWaifu"
interface banner{
  bannerId: string,
  name : string,
  dropRates: Array<number>,
  focusWaifu : Array<templateWaifu> | null,
  focusRate : number,
  startingDate : number,
  duration : number,
  imgURL : string,
  description : string,
}
export default banner
