import { ResolveType, RejectType, Executor } from './actiontype'

export default class Promise<T = any> {
  public resolve!: ResolveType
  public reject!: RejectType
  public status!: string  
  public resolve_executor_value!: any
  public reject_executor_value!: any
  // 保存成功状态要执行的函数
  public resolve_then_callbacks: (() => void)[] = []
  // 保存失败状态要执行的函数
  public reject_then_callbacks: (() => void)[] = []

  constructor(executor: Executor) {
    this.status = 'pending' // 起始等待状态
    this.resolve = (value: any): any => {
       
      if(this.status === 'pending') {        
        this.status = 'success'
        this.resolve_executor_value = value
        this.resolve_then_callbacks.forEach(cb => cb())
      }
      
    }
    this.reject = (reason: any): any => {    
      if(this.status === 'pending') {
        this.status = 'fail'
        this.reject_executor_value = reason
        this.reject_then_callbacks.forEach(cb => cb())
      }
    }

    try {
      executor(this.resolve, this.reject)
    } catch (error: any) {
      this.status = 'pending'

      this.reject(error.toString())
      
      throw new Error("程序终止...")
    }
  }
  
  then(resolveInThen: ResolveType, rejectInThen?: RejectType) {
    // 返回promise对象实现then的级联
    return new Promise((resolve, reject) => {
      let result: any;
      if(this.status === 'success') {
        result = resolveInThen(this.resolve_executor_value)
        resolve(result)
      }
      if(this.status === 'fail') {
        result = rejectInThen!(this.reject_executor_value)
        reject(result)
      }
      // 如果执行异步方法，则执行到then是status状态仍未pending，此时采用发布订阅模式将then方法保存
      if(this.status === 'pending') {
        this.processManyAsyncAndSync(resolveInThen, rejectInThen!, resolve, reject);
      }
    })
  }

  /**
   * 执行多个异步+多级then的处理方法
   * @param resolveInthen 
   * @param rejectInThen 
   * @param resolve 
   * @param reject 
   */
  processManyAsyncAndSync(resolveInthen: ResolveType, rejectInThen: RejectType,
    resolve: ResolveType, reject: RejectType) {
    let result: any
    
    this.resolve_then_callbacks.push(() => {
      result = resolveInthen(this.resolve_executor_value)

      if (isPromise(result)) {// 是异步的Promise对象
        result.then((resolveSuccess) => {
          resolve(resolveSuccess)
        }, (rejectFail) => {
          reject(rejectFail)
        })
      } else {
        resolve(result)// 如果是普通的数据,不是异步的Promise对象
      }
    })

    this.reject_then_callbacks.push(() => {
      result = rejectInThen(this.reject_executor_value)

      if (isPromise(result)) {// 是异步的Promise对象
        result.then((resolveSuccess) => {
          resolve(resolveSuccess)
        }, (rejectFail) => {
          reject(rejectFail)
        })
      } else {
        reject(result) // 如果是普通的数据,不是异步的Promise对象
      }
    })
  }

  static all(promises: Promise[]): Promise {
    return new Promise((resolve, reject) => {
      let executorIndex = 0 // 定义变量来计算索引
      let allResolveSuccessValue: Array<any> = []
      promises.forEach((promise, index) => {
        promise.then(resolveSuccess => {
          ProcessData(resolveSuccess, index)
        }, (rejectFail) => {
          reject(rejectFail) // 只要有一个promise对象的resolve执行失败
          return
        })
      })

      function ProcessData(resolveSuccess: any, index: number) {
        allResolveSuccessValue[index] = resolveSuccess
        executorIndex++
        if(executorIndex === promises.length) { // 所有的promise对象resolve函数全部执行完毕
          resolve(allResolveSuccessValue)
        }
      }
    })
  }
}

// is 是一个类型保护关键字，用于检查一个值是否属于某个特定的类型
function isPromise(val: any): val is Promise {
  return isObject(val) && isFunction(val.then)
}

function isObject(val: any): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

function isFunction(data: any): data is Function {
  return typeof data === 'function'
}

export {}


