import user from '../user'
import dealObjectType from './dealObjectType'

interface deal {
  turn: "0" | "1",
  proposer: user,
  accepter:user,
  '0':Array<{reference: number, type: dealObjectType, name:string, complement:string | number}>,
  '1':Array<{reference: number, type: dealObjectType, name:string, complement:string | number}>,
  valid:boolean
}

export default deal
