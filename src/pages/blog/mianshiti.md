---
title: '面试题'
description: '面试题'
pubDate: '---'
# heroImage: '/placeholder-hero.jpg'
layout: '../../layouts/BlogPost.astro'
---

#### 1. 对SPA单页面的理解，它的优缺点？

​	SPA单页面：是在 Web 页面初始化时加载相应的 `HTML`、`JavaScript`、`CSS` 。一旦页面加载完毕，SPA页面不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是**利用路由机制**实现 HTML 内容的变换，`UI` 与用户的交互，避免页面的重新加载。

​	优点：用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；基于上面一点，它对于服务器的压力也会更小一点；前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理。

​	缺点：初次加载时间耗时多（因为要一次性加载`JavaScript`、`CSS` ，部分页面按需加载）；前进后退路由管理（由于单页面应用在一个页面展示所有的内容，所以不能用浏览器的前进后退，所有的页面切换要自己建立堆栈进行管理）；`SEO` 难度较大（由于所有的内容都在一个页面中动态替换显示，所以在 `SEO` 上有着天然的弱势）



#### 2.v-show 和 v-if 的区别

​	v-if：真正意义上的条件渲染。它是将指定的部分进行重建和销毁；也是惰性的，如果初始化v-if后面的条件为假，则什么都不会做，直到条件为真，才会进行渲染条件块

​	v-show：只是进行 `css` 部分的显示和隐藏，并不会将条件块销毁和重建

​	所以 v-if 适用于条件不那么频繁改变的场景，v-show 适用于条件频繁改变的场景



#### 3. class 和 style 如何进行动态绑定？

​	`:class= "{active: 条件}"` 、`:style="{color: 变量}"` 



#### 4.如何理解 `Vue` 的单向数据流 ？

​	在父子组件中，子组件利用 props 来接收父组件传过来的数据，但是子组件无法常规的将数据返回给父组件，只能利用 $emit 自定义事件来告诉父组件数据的改变，父组件再将数据更改



#### 5.watch 和 computed 的区别？

​	watch：对数据进行监听，只有数据发生改变，watch才会触发（可以放异步代码、花销较大的代码）

​	computed：计算属性，默认是懒执行的，有缓存（放同步、花销较小的代码）

​	本质二者都是由 watcher 类完成功能的



#### 6.直接给一个数组项赋值，`Vue` 可以检测到变化吗？

​	不能，利用 $set 进行数组赋值，利用 splice 改变数组长度（`pop、push、shift、unshift`  都行）



#### 7.生命周期？

​	`Vue` 实例有一个完整的生命周期，从开始创建 => 初始化数据 => 编译模板 => 挂载DOM => 渲染更新 => 渲染销毁，这一整个过程

​	`beforeCreate` ：此时数据还没有初始化，获取不到data里面的数据，methods里面的方法，el 就更没有了，挂载了一些默认的事件和钩子函数

​	created：此时数据已经初始化完成，可以获取到 data里面的数据、methods 里面的方法，但 el 依然后取不到

​	`beforeMount`：此时数据可以获取到，模板已经编译好了，但是并没有渲染到页面上

​	mounted：渲染页面，此时可以获取到 el 

​	`beforeUpdate`：data里面的数据发生更改，但是页面还没有更新

​	updated：页面进行更新，让页面和 data 都是最新的

​	`beforeDestroy`： 销毁阶段，但只是开始，还没有真正开始

​	destroyed：销毁组件，里面的方法、指令、数据全部都会处理掉



#### 8. `Vue` 的父组件和子组件生命周期钩子函数的执行顺序？

​	加载渲染过程：父`beforeCreate` => 父 created => 父 `beforemount` => 子`beforeCreate` => 子 created => 子 `beforemount`  => 子 mounted => 父 mounted

​	子组件更新过程：父`beforeUpdate` => 子`beforeUpdate` => 子updated => 父 updated 

​	父组件更新过程： 父`beforeUpdate` => 父 updated 

​	销毁过程：父`beforeDestroy` => 子`beforeDestroy` => 子destroyed => 父 destroyed



#### 9.父组件可以监听到子组件的生命周期吗？

​	可以

```javascript
// 父组件 parent 子组件 child

// 1.手动，利用 $emit 来监听
// parent.vue
<child @mounted="somthing"/>
  
// child.vue
mounted() {
  this.$emit('mounted')
}

// 2.还可以利用 @hook 来监听
// parent.vue
<child @hook:mounted= "somthing"/>
  
somthing() {
  console.log('父组件监听到 mounted 钩子函数')
}

// child.vue
mounted() {
  console.log('子组件触发 mounted 钩子函数')
}

// 以上输出顺序为：
// 子组件触发 mounted 钩子函数
// 父组件监听到 mounted 钩子函数
```



#### 10.keep-alive 的理解？

​	keep-alive: 用来缓存组件（一般结合路由和动态组件一起使用），提供 include（名称匹配的会被缓存） 和 exclude（名称匹配的不会被缓存） 属性，两者都支持字符串和正则表达式，exclude 的优先级大于 include ; 同时，还对应着 activated（组件被激活，触发） 和 deactivated（组件被移除，触发） 两个钩子函数



#### 11.data为什么是一个函数，而不是一个对象？

​	data 如果是一个对象，那么子组件之间的 属性 会相互影响（因为作用域没有隔离，所以可能会冲突），是函数的话，则不会影响（返回对象的独立的拷贝）



#### 12.v-model 的原理？

​	是 value 属性 和 input 事件的语法糖



#### 13.`vuex` 的内容？

​	state、getter、mutation、action、module（模块）



#### 14.服务端渲染 `SSR`？

​	`html` 片段放在服务端渲染，再由服务端形成的 `html` 片段返回给客户端，这个过程叫服务端渲染

​	优点：更好的 `SEO` ：因为搜索引擎爬取工具可以抓取渲染好的页面

#### 15.字符串方法 replace

​	字符串的 replace 方法，不会改变原字符，只会生成一个新的字符串