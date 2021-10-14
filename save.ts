import encode from './encoding/encode'
import fs from 'fs'

export default async function save(){

  const dealIdGeneratorData = JSON.stringify(dealIdGenerator)

  fs.writeFile('./files/dealIdGenerator.json', dealIdGeneratorData, (err) => {
    if(err) console.log(err)
  })

  const globalAuctionData = encode(globalAuction)

  fs.writeFile('./files/globalAuction.json', globalAuctionData, (err) => {
    if(err) console.log(err)
  })

  const userShopData = encode(userShop)

  fs.writeFile('./files/userShop.json', userShopData, (err) => {
    if(err) console.log(err)
  })
}
