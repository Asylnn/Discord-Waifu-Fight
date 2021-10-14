/*import message from '../../class/message'
import user from '../../class/user'
import testArg from '../util/testArguments'
*/
/*o!useequipmentXP A B C

A = Soit l'index du tableau ou l'index de la waifu
B = Rien ou "outfit..."

A = Montant
B = Soit l'index du tableau de l'inventaire OU un des 3 mots suivants : weapon,outfit,accessory
C = Index de la waifu équipée ou rien

args = [0, A, B, C]
*/
/*export default async function useEquipmentXP(message: message, user: user, args: Array<string>){
  const amount = Math.floor(+args[1])
  if(isNaN(amount) || amount < 1){message.addResponse(eval(getLoc)("amount_NaN")); return true;}
  const selectedObject = args[2]

//  if(!testArg(message, user, waifuIndex, "validWaifu")){return true;} Tester le montant
  if (!isNaN(+selectedObject)) {
    //Index tableau inventaire
    //Tester si c bien un nombre de l'index (virer les négatifs et les valeurs supérieures au dernier index)
  }
  else if(selectedObject.includes("weapon","outfit","accessory")){
    const waifuIndex = parseInt(args[3])

  }
  else{
    message.addResponse("...")
    return true
  }

  const virginItem = deepCopy(items.get('-1') as item)//no effect item
  if(user.waifuXP < amount){message.addResponse(eval(getLoc)("user_xp_enough_xp")); return true;} // Check if the user has enough XP of the type he want to use
  virginItem.effects = [{effectType:'earn_XP', value:[amount, false]}]
  user.waifuXP -= amount
  user.waifus[waifuIndex].giveXP(amount, message, false)
  message.addResponse(eval(getLoc)("use_user_waifu_xp"))
}
*/
