function test<type extends string | number>(a:type){
  return a
}
let a: Array<string | number> = [1]
const b = a[0]
let u = test("10")
