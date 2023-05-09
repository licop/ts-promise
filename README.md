# 使用 Typescript 实现 Promise 源码

**promise 的三种状态**：

pending ，resolve，reject。pending 就是等待，resolve 可以理解为成功，reject 可以理解为拒绝

**pending 状态 理解**：

代表等待的状态，pending 状态下，可能执行 resolve() 的方法，也可能执行 reject()方法。 创建好 Promise 对象 后，但在执行 resolve()或 reject() 前为 Pending 状态。

**resolve 状态**

理解代表成功态，执行 resolve() 方法后的状态。

**reject 状态**

代表失败态，执行 reject()方法后的状态。

**状态特性**

一旦成功了就不能失败，反过来也是一样。

**then 方法**

每个 promsie 都有一个 then 方法。

**其他也执行 reject 的 场景：**

正在执行 resolve() 方法报错了，也进入 reject 失败状态。
