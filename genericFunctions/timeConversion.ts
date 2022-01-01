export function milliToMinutes(milli: number){
   let min = Math.floor(milli/60000)
   milli = milli % 60000
   let sec = Math.floor(milli/1000)
   return `${min}min${sec}s`
}

export function milliToHours(milli: number){
   let hours = Math.floor(milli/3600000)
   milli = milli % 3600000
   let min = Math.floor(milli/60000)
   milli = milli % 60000
   let sec = Math.floor(milli/1000)
   return `${hours}h${min}min${sec}s`
}

export function milliToDays(milli: number){
   let days = Math.floor(milli/86400000)
   milli = milli % 86400000
   let hours = Math.floor(milli/3600000)
   milli = milli % 3600000
   let min = Math.floor(milli/60000)
   milli = milli % 60000
   let sec = Math.floor(milli/1000)
   return `${days}j${hours}h${min}min${sec}s`
}
