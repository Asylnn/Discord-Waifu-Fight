import message from '../message'
import waifu from '../waifu'
import item from '../item'
import leaderboard from './leaderboard'

interface pageEmbed {
  message:message,
  waifus?:waifu[],
  items?:{item:item, qty:number}[],
  leaderboard?:leaderboard,
  help?:{userLvl:number},
  otherType?: string
  id:string,
  totalPages:number,
  page:number
}

export default pageEmbed
