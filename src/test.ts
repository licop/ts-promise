import Promise from './promise'

let promise1 = new Promise((resolve, reject) => {
  resolve('licop')

})

promise1.then((resolveResult) => {
  console.log(resolveResult, 9)
}, (rejectResult)=> {
  console.log(rejectResult, 11)
})