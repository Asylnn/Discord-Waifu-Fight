import message from '../../class/message'
import deal from '../../class/types/deal'

export default function seeDeal(deal: deal, message: message){
  message;
  let content = `${eval(getLoc)("your_terms")} : \r\n`
  let turn = deal.turn
  if(deal[turn].length != 0){
    deal[turn].forEach(object => content += `${object.type} ${object.name} ${object.complement} \r\n`)
  }
  else{
    content += `${eval(getLoc)("no_terms")}\r\n`
  }
  content += `${eval(getLoc)("opponant_terms")} : \r\n`
  turn = turn == "0" ? "1" : "0"
  if(deal[turn].length != 0){
    deal[turn].forEach((object, index) => content += `${index + 1} : ${object.type} ${object.name} ${object.complement} \r\n`)
  }
  else{
    content += `${eval(getLoc)("no_terms")}\r\n`
  }
  return content
}
