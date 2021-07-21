import Discord from 'discord.js'

export default class collection<typeKey, typeValue> extends Discord.Collection<typeKey, typeValue>{
  constructor(array?: Array<any>){
    super(array)
  }

  /*restructureKeys(){
    let col = this.clone()
    let index = 1
    this.clear()
    col.each((value) => {this.set(index,value); index++})
  }

  remove(key){
    this.delete(key)
    this.restructureKeys()
  }*/

  /*add(){
    for (var i = 0; i < arguments.length; i++) {
      this.set(this.size + 1, arguments[i])
    }
    return this
  }

  _sort(sortFunction: Function){
    for (var i = 1; i <= this.size; i++) {
      for (var j = 1; j < this.size; j++) {
        if(sortFunction(this.get(j), this.get(j+1)) < 0 ){
          let temp = deepCopy(this.get(j))
          this.set(j, this.get(j+1))
          this.set(j+1, temp)
        }
      }
    }
  }

  /*addModificator(modificatorName, modificatorValue){
    if(this.has(modificatorName)){
      if(additiveModificators.includes(modificatorName)){
        this.set(modificatorName, this.get(modificatorName) + modificatorValue)
      }
      else{
        this.set(modificatorName, this.get(modificatorName)*modificatorValue)
      }
    }
    else{
      this.set(modificatorName, modificatorValue)
    }
    return this
  }
  removeModificator(modificatorName, modificatorValue){
    if(additiveModificators.includes(modificatorName)){
      this.set(modificatorName, this.get(modificatorName) - modificatorValue)
    }
    else{
      this.set(modificatorName, this.get(modificatorName)/modificatorValue)
    }
  }
  concatModificators(col){
    let col2 = this.clone()
    col.each((value, key) =>{
      col2.addModificator(key, value)
    });
    return col2
  }*/
}
