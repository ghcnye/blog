---
title: 'vue3学习记录'
description: 'vue3学习记录'
pubDate: '---'
# heroImage: '/placeholder-hero.jpg'
layout: '../../layouts/BlogPost.astro'
---


#### 1.书写格式

​	每一个新的 `.vue` 文件，都要引用`vue` 的`ref` （属性的响应式关键词）、`reactive` （对象的响应式关键词）、`defineComponent`等等（每一个钩子函数如果需要使用也要引入）（不需要 this 调用）

​	同时在 setup 中（有两个参数 props跟context），定义的变量（注意：在setup里面调用定义变量的值时，要加上   `变量名.value`  才能取到）和方法都要 return 出来，但 钩子函数 和 watch 不需要 return 出来

​	watch 要注意，函数，传入关联的属性或者对象，还有一个回调函数

​	methods 方法要注意，写成  `const changeHandle = () => {  }` 这种形式，注意，要 return 方法名

​	钩子函数如果放在与 setup 同级上，访问 setup 里定义的变量和方法需要利用`this.变量名`或者`this.方法名` 

#### 2.  `watchEffect` 和 `watch` 的区别

​        1.不需要主动传入依赖（不需要关联变量）

​        2.每次初始化会执行一次回调函数来自动获取依赖

​        3.无法获取到原值，只能得到变化后的值 （只得到最新的值）

#### 3.  `vue3`生命周期变成了各种 `API` ， `API` 写在 setup里面

​      `beforeCreate => 使用 setup()`  

​      `created => 使用 setup()` 

​     ` beforeMount => onBeforeMount `    挂载前

​      `mounted => onMounted`                  挂载后

​      `beforeUpdate => onBeforeUpdate` 

​      `updated => onUpdated` 

​      `BeforeUnmount=> onBeforeUnmount`   相当于 `v2` 的 `beforeDestroy` 

​      `Unmounted=> OnUnmounted`                          相当于 `v2` 的 `destroyed` 

​      `errorCaptured => onErrorCaptured`    当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。钩子返回 false，阻止错误继续向上传播

​      `renderTracked  => onRenderTracked`  状态跟踪，`v3` 新引入的钩子，只在开发环境中有效，**用于跟踪所有响应式变量和方法**，一旦页面有 update ，就会跟踪它们并返回一个 event 对象

​      `renderTriggered => onRenderTriggered`  状态触发，同样 `v3` 新引入的钩子，只在开发环境中有效，它**只会定点追踪发生改变的数据**，同样返回一个 event 对象

​	`activated => onActivated` 与keep-alive 一起使用，当被 keep-alive 包裹的组件**激活**时 调用

​	`deactivated => onDeactivated` 与keep-alive 一起使用，当被 keep-alive 包裹的组件**停用**时 调用

#### 4.使用setup语法糖

​	变量和方法不需要在 return