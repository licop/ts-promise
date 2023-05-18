import Promise from './promise'

let promise1 = new Promise((resolve, reject) => {
  console.log('第一个Promise的同步区域')
  setTimeout(() => {
    resolve('第一个异步操作')
  }, 2000)
})

let promise2 = new Promise((resolve, reject) => {
  console.log('第二个Promise的同步区域')
  setTimeout(() => {
    resolve('第二个异步操作')
  }, 1000)
})

let promise3 = new Promise((resolve, reject) => {
  console.log('第三个Promise的同步区域')
  setTimeout(() => {
    resolve('第三个异步操作')
  }, 5)
})

Promise.all([promise1, promise2, promise3]).then(value => {
  console.log(value)
})

// promise1.then((resolveResult) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(resolveResult, 15)
//       reject('第二个异步操作')
//     },2000)
//   })
// }, (rejectResult)=> {
//   console.log(rejectResult)
// }).then((resolveResult2) => {
//   console.log(resolveResult2, 13)
//   return 'ok2'
// }, (rejectResult2)=> {
//   console.log(rejectResult2, 17)
// })

