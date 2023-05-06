import Promise from './promise'

let promise1 = new Promise((resolve, reject) => {
  resolve('licop')

})

promise1.then((resolveResult) => {
  console.log(resolveResult, 9)
  return 'ok'
}, (rejectResult)=> {
  console.log(rejectResult, 11)
})
// .then((resolveResult2) => {
//   console.log(resolveResult2, 13)
//   return 'ok2'
// }, (rejectResult2)=> {
//   console.log(rejectResult2, 17)
// }).then((resolveResult3) => {
//   console.log(resolveResult3, 19)
// }, (rejectResult3)=> {
//   console.log(rejectResult3, 21)
// })