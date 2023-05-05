import {ResolveType, RejectType, Executor } from './actiontype'

export default class Promise<T = any> {
  public resolve!: ResolveType
  public reject!: RejectType
  public status!: string  
  public resolve_executor_value!: any
  public reject_executor_value!: any

  constructor(executor: Executor) {
    this.status = 'pending' // 起始等待状态
    this.resolve = (value: any): any => {
      if(this.status === 'pending') {
        this.status = 'success'
        this.resolve_executor_value = value

        console.log("resolve===>value", value)
      }
      
    }
    this.reject = (reason: any): any => {
      if(this.status === 'pending') {
        this.status = 'fail'
        this.reject_executor_value = reason

        console.log("reject===>value", reason)
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
  
  then(resolveInThen: ResolveType, rejectInThen: RejectType) {
    if(this.status === 'success') {
      resolveInThen(this.resolve_executor_value)
      console.log('resolveInthen被执行')
    }
    if(this.status === 'fail') {
      rejectInThen(this.reject_executor_value)
      console.log('rejectInThen被执行')
    }
  }
}

export {}


