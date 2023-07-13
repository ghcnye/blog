---
title: 'vue2开发记录'
description: 'vue2开发记录'
pubDate: '---'
# heroImage: '/placeholder-hero.jpg'
layout: '../../layouts/BlogPost.astro'
---


#### 1.响应式

​	`vue2.0` 会对定义在data里面的属性进行处理，利用`Object.definepropety`进行数据劫持，对每一个数据创建一个`Dep`类，`Dep`类中包含这个数据所有关联的Watcher类，一旦数据发生变化，就会触发这个`Dep`类(notify方法通知watcher类)，再通过Watcher类将数据改变（update()方法），对数组的一部分方法进行了重写，所以有一部分的数组方法是具有响应式的

​	响应式的核心是通过`Object.definepropety`，拦截对数据的访问和设置

​	添加新数据时进行响应式处理，然后由`dep`通知watcher去更新

​	删除数据时，也是由`dep`通知watcher去更新

​	访问数据时，(obj.key)进行依赖收集，在`dep`中存储相关的watcher

​	设置数据时，由`dep`通知watcher去更新

​	对象，循环遍历对象的所有属性，为每个属性设置getter、setter，已达到数据拦截访问和设置的目的，如果属性值依旧是对象，则递归为属性值上的每个key设置getter、setter

​	数组，增强数组的那7个可以更改自身的原型方法，然后拦截对这些方法的操作

#### 2.虚拟Dom

​	虚拟Dom（一个`JS`对象，包含节点信息，属性、方法等）和`diff`算法（从上往下、对数据进行对比，查找变化的数据，利用 ：key的唯一性，可以更快查找）

#### 3.同步和异步

​	同步和异步（基本上是以promise对异步代码进行处理，`async` 和 `await`，将异步代码转化为同步）

​	注意： DOM数据的更改也是异步的，对于这种基本用`nexttick`进行处理

​	注意：代码运行的先后顺序，不一定代码书写的顺序

#### 4. `RBAC` 

​	`RBAC`基于角色的权限管理，对于用户和权限之间，利用角色这一概念，将二者关联

​	用户可能会有很多角色，而角色的权限是固定的，这也就分配了这个用户的权限

#### 5.render函数

​	render函数即渲染函数（因为template有时太过冗余，利用render函数将会更直观的展现）

  	render函数的参数也是一个函数 `createElement`（里面有三个参数）   render函数的返回值是一个`vnode`对象（虚拟节点），在经过mount方法转化为真正的DOM结构

  	`createElement` 函数中 参数一（必须）：HTML标签或者一个组件 string | object | function           参数二：参数一中标签的属性 object   参数三：子虚拟节点也可以书写标签里面的内容  string | array

  	`createElement` 函数返回的是一个`vnode`对象（虚拟节点）

  	例子：

```vue
render: function(createElement) { return createElement('h3',{class: 'box'},['hello',createElement('button',['按钮'])])}	
```

####  6.`vuex` 

​	`vuex`分模块时，直接进行调用

​	state：   this.$store.state.模块名.变量名      辅助函数：

​	mutations :    this.$store.commit("模块名/方法名",参数)          辅助函数 ：

#### 7.项目注意点

​	1.项目背景图要设置随界面变化而变化，不能单纯的只写一个背景图（如果数据过长，出现滚动条，**背景图就会出现缺失**）

​	2.`mousedown`事件，在浏览器中事件的回调函数可以打印出 `event.button` 的类型，鼠标右击 是2，鼠标左击 是0，中间是 1

​	3.`vue`项目内页面内靠router跳转，注意要将路由守卫中的next（）改为next（`fullPath`）注意：要有条件，不要直接写next（`fullPath`），因为这个是代表着重新走一次路由守卫，如果没有条件，会**循环**，导致出错

​	4.在项目里，如果页面一打开需要调用许多接口，这是需要注意，**多个接口有可能相互影响**，造成接口不能正常返回数据（一般第一个是正常的，第二个就会出现问题）

​	5.在项目里，注意页面里的定时器，如果页面有定时器，并在定时器后面调用了页面的函数（不能再里面调用页面接口，如果页面切换，定时器还存在，调用接口可能会导致接口没有参数而出错），那在页面销毁时要注意，记得清除定时器，以防页面切换定时器没有清除，后面的操作可能就会出现问题

​	6.**项目打包之后的修改`IP`**，（可以在`public`里面加上一个`config.js` 文件，在这里面设置生产环境需要的`IP`，在`index.html`引入，打包之后dist 文件夹下有一个 `config.txt` 文件，就是上面的`config.js` 文件，手动修改配置即可）

#### 8.常用插件

​	`codemirror`，代码块插件

​	`echarts-liqufill`， 水球图插件（要装`echarts`插件，注意： `echarts`版本4+，匹配`echarts-liqufill`2+）

​	`vue-printv-np`， 打印插件

​	`antV`工具，可视化和图形的这类工具，可以尝试，`antv X6`可以绘制图形（例如：`er`图、流程图等）

​	canvas使用主要是利用函数进行逻辑绘画，在mounted函数进行调用即可

#### 9.methods、computed和watcher的区别

​	methods一般用于封装一些较为复杂的处理逻辑（同步、异步）

​	computed一般用于封装一些简单的同步逻辑，将经过处理的数据返回，然后显示在模板中，以减轻模板的重量

​	watch一般用于当需要在数据变化时执行异步或者开销较大的操作

​	computed和watch本质上是一样的，内部都是通过Watcher 来实现的，主要区别：

​	1.使用场景上的区别

​	2.computed默认是懒执行的

#### 10.`vue`源码的入口文件

​	`vue`源码的入口文件是：`entry-runtime-with-compiler-esm.ts `文件（然后根据`Vue`的导入导出情况，找到`Vue`的构造函数：在 instance文件夹下的 index.ts 文件里）

#### 11. `Vue`的异步更新机制是如何实现的？

​	`Vue`的异步更新机制的核心是利用了浏览器的异步任务队列来实现的，首选微任务队列，宏任务队列次之

​	当响应式数据更新后，会调用`dep.notify`方法，通知`dep`收集的watcher去执行update方法，watcher.update将watcher自己放入一个watcher队列（全局的queue数组）然后通过`nextTick`方法将一个刷新watcher队列的方法（`flushSchedulerQueue`）放入一个全局的callbacks数组中

​	如果此时浏览器的异步任务队列中没有一个叫 `flushCallbacks`的函数，则执行 `timerFunc` 函数，将`flushCallbacks`函数放入异步任务队列。如果异步任务队列已经存在`flushCallbacks`函数，等待其执行完成后再放入下一个`flushCallbacks`函数

​	`flushCallbacks`函数负责执行 callbacks 数组中所有的`flushSchedulerQueue`函数

​	`flushSchedulerQueue`函数负责刷新watcher队列，及执行queue数组中每一个watcher的run方法，从而进入更新阶段。比如：执行组件更新函数或者执行用户watch的回调函数

#### 12. `Vue`的`nextTick API`是如何实现的？

​	将传递的回调函数用 try catch 包裹，然后放入 callbacks数组

​	执行`timerFunc` 函数，在浏览器的异步任务队列放入一个刷新callbacks数组的函数

#### 13. `Vue` 的各种 `API`？

​	`Vue.use（plugin）`：负责安装 `plugin` 插件，也就是执行插件提供的 `install` 方法（最开始是判断是否已经安装过）

​	`Vue.mixin（options）`：负责在 `Vue` 的全局配置上合并 `options` 配置。然后在每个组件生成 `vnode` 时会将全局配置合并到自身配置上

​	`Vue.components（compName，comp）`：负责全局注册组件。就是将组件配置注册到全局配置的 `components`选项上（`options.components`），然后再各个子组件在生成 `vnode`时将全局`components`选项合并到局部的`components`配置项上

​	`Vue.directive('my-directive',{xx})`：负责全局注册`my-directive`指令，然后每个子组件在生成 `vnode`时将全局`directives`选项合并到局部的`directives`配置项上

​	`Vue.filter（'my-filter',function(val){xx}）`：负责在全局注册过滤器`my-filter`，然后每个子组件在生成 `vnode`时将全局`filters`选项合并到局部的`filters`配置项上

​	`Vue.extend(options)`：是基于`Vue`创建一个子类，参数options 会作为该子类的默认全局配置，就像` Vue` 的默认配置一样。所以利用`Vue.extend`拓展一个子类，一大用处就是内置一些公共配置，供子类的子类使用

​	`Vue.set(target,key,val)`：由于 `Vue`无法探测普通的新增 property（比如`this.myOption.newProperty = 'hi'`），所以通过 `Vue.set`为响应式对象中添加一个property，可以确保这个新的 property 同样是响应式的，且触发视图更新

​	`Vue.delete(target,key)`：删除对象的 property，如果对象是响应式的，确保删除可以触发视图更新。这个方法主要用于避开 `Vue`不能检测到 property 被删除的限制。不能删除根级别的响应式属性

​	`Vue.nextTick(cb)`：作用是延迟回调函数 `cb` 的执行。一般用于 `this.key = newVal`更改数据后，想立即获取更改后的 DOM数据

​			原理：`this.key = 'new val'`触发依赖通知更新，将负责更新的 watcher 放入 watcher 队列，再将`flushSchedulerQueue`放入 callbacks 数组中，在浏览器的异步队列中放入一个刷新callbacks 数组的函数，`$nextTick`来插队，直接将`cb`放入到 callbacks 数组中，待将来某个时刻执行刷新 callbacks 数组的函数（也就是`flushcallbacks`方法）,这个函数会触发 `watcher.run` 方法，更新 DOM

#### 14.`Vue` 实例自带的方法

​	`vm.$delete`：用于删除对象上的属性。如果对象是响应式的，且能确保可以触发视图更新。该方法主要用于避开 `Vue` 不能检测属性被删除的情况(数组利用splice方法，对象利用 delete运算符删除再执行`dep.notify`进行依赖通知，更新视图)

​	`vm.$watch`：负责观察 `Vue`实例上的一个表达式或者一个函数计算结果的变化。当其发生变化时，回调函数会被执行，并传递两个参数，第一个为更新后的新值，第二个为老值。（注意观察的是一个对象的时候，要注意新值和老值都指向同一个引用）

​				内部原理是：设置 `options.user = true`标志是一个用户watcher，再实例化一个 Watcher 实例，当检测到数据更新时，通过 watcher 去触发回调函数的执行，并传递新老值作为回调函数的参数，最后返回一个 `unwatch` 函数，用于取消观察

​	`vm.$on`：监听当前实例上的自定义事件，事件可由 `vm.emit`触发，回调函数会接收所有传入事件触发函数（`vm.emit`)的额外参数；原理：就是处理传递的 event 和 callback 两个参数，将注册的事件和回调函数以键值对的形式存储到 `vm._event`对象中。

​	`vm.$emit`：触发当前实例的指定事件，附加参数都会传递给事件的回调函数；原理：执行`vm._event`中所有的回调函数

​	`vm.$off`：移除自定义事件监听器，即移除`vm._events`对象上相关数据

​	`vm.$once`：监听一个自定义事件，但是该事件只会触发一次，一旦触发以后监听器就会被移除；原理：包装用户传递的回调函数，当包装函数执行的时候，除了会执行用户回调函数之外，还会执行`vm.$off`移除该事件

​	`vm._update`：这是一个用于源码内部的实例方法，负责更新页面，是页面渲染的入口，其内部根据是否存在 `preVnode` 来决定是首次渲染还是页面更新，从而在调用  `__patch__ `函数时传递不同的参数

​	`vm.$forceUpdate`：迫使 `Vue` 实例重新渲染，它仅仅影响组件实例本身和插入插槽内容的子组件，而不是所有子组件。原理：直接调用 `vm._watcher.update()`。它就是 `watcher.update()`方法，执行该方法触发组件更新

​	`vm.$destroy`：完全销毁一个实例。清理它与其它实例的连接，解绑它的所有指令和事件监听器

​	`vm._render`：是一个用于源码内部的实例方法，负责生成 `vnode`

#### 15. `V2`编译的底层流程

​	模板语法（`v2`格式）  ==>   `AST` 抽象语法树（本质是` JS` 对象）  ==>   渲染函数（即常说的 h函数）    =（通过`diff`算法中的 patch 函数）=>    虚拟节点   ==>   界面

#### 16. `V2`编译器做了三件事

​	1.将 `html` 解析成 `ast` 对象

​	2.优化，遍历 `ast` ，为静态节点进行标记（后续更新过程会跳过静态节点）

​	3.生成渲染函数，也就是 render函数。（还有一个`staticRenderFns` 数组，里面存放所有静态节点的渲染函数）

#### 17.渲染函数的生成过程

​	  1.编译器生成的渲染函数分为两类 （一类是动态属性生成的渲染函数，另一类是 静态属性生成的渲染函数放在 `staticRenderFns` 数组中）

​	  2.渲染函数生成的过程，就是在遍历 `AST` 节点，通过递归的方式，处理每一个节点，最后形成 `_c(tag, attr, children, normalizationType)`  `tag` 是标签名，`attr` 是属性对象，`children` 是子节点组成的数组，其中每个元素的格式都是` _c(tag, attr, children, normalizationType) `形式，`normalizationType` 表示节点的 规范化类型

#### 18.编译注意点：

​	1.单纯的` v-once `节点的处理方式跟 静态节点一致

​	2.v-if 节点的处理结果是一个三元表达式

​	3.v-for 节点的处理结果是 `_l` 函数，该函数负责生成 v-for 的 `vnode`

​	4.组件的处理结果和普通元素一样，得到的是形如 `_c(compName)` 的可执行代码，用于生成组件的 `vnode`

​	5.将生成静态节点的 `vnode` 函数放到 `staticRenderFns` 数组中，返回一个 `_m(idx)` 的可执行函数，意思是执行 `staticRenderFns` 数组中下标为 `idx`的函数，用于生成 `vnode`

#### 19.一个组件如何变成 `vnode`？

​	1.组件实例初始化，最后执行 `$mount` 进入挂载阶段

​	2.如果是只包含运行时的 `vue.js`，直接进入挂载阶段，因为这时候的组件已经变成了渲染函数，编译过程通过模块打包器 + `vue-loader` + `vue-template-compiler` 完成的

​	3.如果没有使用预编译，则必须使用全量的` vue.js`

​	4.挂载时如果发现组件配置项上没有 render选项，则进入编译阶段

​	5.将模板字符串编译成 `AST` 语法树，其实就是一个普通的 `js` 对象

​	6.然后优化 `AST`，遍历 `AST` 对象，标记每一个节点是否为静态节点，然后进一步标记出静态根节点，在组件后续更新时会跳过这些静态节点的更新，以提高性能（静态节点：没有动态属性的节点，

静态根节点：首先是静态节点，并且有子节点，并且子节点不是只有一个文本类型的节点）

​	7.接下来从 `AST` 生成渲染函数，生成的渲染函数有两部分组成（一：负责生成动态节点 `vnode` 的render函数  二：还有一个 `staticRenderFns` 数组，里面每一个元素都是一个生成静态节点 `vnode` 的函数，这些函数会作为 render 函数的组成部分，负责生成静态节点的 `vnode` ）

​	8.接下来将渲染函数放到组件的配置对象上，进入挂载阶段，即执行 `mountComponent` 方法

​	9.最终负责渲染组件和更新组件的是一个叫 `updateComponent` 方法，该方法每次执行前首先需要执行 `vm._render` 函数，该函数负责执行编译器生成的 render，得到组件的 `vnode`

​	10.将一个组件生成`vnode`的具体工作是由 render 函数中的` _c、_o、_l、_m`等方法完成的，这些方法都被挂载到 `vue`实例上，负责在运行时生成组件 `vnode`

#### 20. `vue`的`patch`算法

​	`Vue`的`patch`算法有三个作用：负责首次渲染和后续更新或者销毁组件

​		首先是全量更新所有的属性

​		如果是新老 `Vnode` 都有孩子，则递归执行 `updateChildren`，进行`diff`过程

​	针对前端操作的 DOM 节点的特点进行如下优化：

​		1.如果新的`Vnode`有孩子，老的`Vnode`没有孩子，则新增这些新孩子节点

​		2.如果老的`Vnode`有孩子，新的`Vnode`没有孩子，则删除这些老孩子节点

​		3.剩下一种就是更新文本节点

​		4.同层比较（降低时间复杂度），深度优先（递归）

​		5.前端很少有完全打乱节点顺序的情况，所以做了四种假设；假设新老`Vnode`的开头结尾存在相同节点，一旦命中假设，就避免了一次循环，降低了`diff`的时间复杂度，提高执行效率。如果没有命中假设，则执行遍历，从老的`Vnode`中找到新的`Vnode`的开始节点

​		6.找到相同节点，则执行 `patchVnode`，然后将老节点移动到正确的位置

​		7.如果老的`Vnode`先于新的`Vnode`遍历结束，则剩余的新的`Vnode`执行新增节点操作

​		8.如果新的`Vnode`先于老的`Vnode`遍历结束，则剩余的老的`Vnode`执行删除节点操作

​		9.如果老的`Vnode`是真实元素，则表示首次渲染，创建整棵DOM树，并插入body，然后移除老的模板节点

​		10.如果老的`Vnode`不是真实元素，并且新的`Vnode`也存在，则表示更新阶段，执行`patchVnode`

​		11.如果新的`Vnode`不存在，老的`Vnode`存在，则调用destroy，销毁老节点

#### 21. `ES6` 及以上版本的 `js`新特性

```javascript
// ES6 及以上版本的 js新特性

// 1.类
class Hunman {
  constructor(name,sex) {
    this.name = name;
    this.sex = sex;
  }
  work() {
    let str = ''
    str = this.name + ' 要工作赚钱'
    return str
  }
}

const man = new Hunman('zs','man')
console.log(man.work());

console.log('-----------------------------------------------------');

// 2.箭头函数，以及函数参数默认值
const countFn = (a,b,c = 10) => {
  return  a + b + c
}

console.log(countFn(1,2));  // 打印值为 ： 13
console.log(countFn(1,2,7));  // 打印值为 ： 10
// 函数默认值，可传可不传。不传 使用默认值，传 使用传递的参数

console.log('-----------------------------------------------------');

// 3.模板字符串、解构、Object.prototype.toString.call() 方法用来检测数据的具体类型
const str1 = 'zs'
const abcFn = (arr) => {
  arr.forEach((val,index)=> {
    console.log(`${str1} --- ${val}`);
  })
  const a = {...arr}
  console.log(a);    // 打印结果为：{0: 1, 1: 2, 2: 3}
  console.log(Object.prototype.toString.call(a));     // 打印结果为：[object Object]
  console.log(Object.prototype.toString.call(a).slice(8.,-1));  // 打印结果为：Object
}
abcFn([1,2,3])

let b = [...str1]
console.log(b);  // 打印结果为：['z', 's']

console.log(Object.prototype.toString.call([1,2,3]));   // 打印结果为：[object Array]
console.log(Object.prototype.toString.call('2022-08-03'));   // 打印结果为：[object String]
// Object.prototype.toString.call() 方法用来检测数据的具体类型,,,再利用 slice(8.,-1) 取最后的类型，就是最准确的类型

console.log('-----------------------------------------------------');

// 4.Array.prototype.includes()
const arr1 = ['zs','ls','wu']

console.log(arr1.includes('zs'));  //打印 true

console.log(arr1.indexOf('zs'));  
// 打印 0   indexOf 查看数组或者字符串里面有没有我们要找的元素或者字段，有则返回index，没有返回 -1

console.log('-----------------------------------------------------');

// 5.指数操作符  Object.values()  Object.entries()
const c = 2**4
console.log(c); // 16

const obj = {
  name: 'zs',
  count: 'wuweishu'
}

console.log(Object.values(obj));   // 打印的结果为 ：['zs', 'wuweishu']
// Object.values() 将对象中的 value 组成一个数组返回

console.log(Object.entries(obj));  // Object.entries() 就是将对象中的每个 key:value 放在一个数组中，返回一个数组
// 打印结果如下：
// [Array(2), Array(2)]
// 0: (2) ['name', 'zs']
// 1: (2) ['count', 'wuweishu']

console.log('-----------------------------------------------------');

// 6.字符串填充
const str2 = 'hello'

console.log(str2);
console.log('1111',str2.padStart(10));  // 1111      hello
console.log(str2.padEnd(10),'1111');   // hello      1111

console.log(str2.padStart(15,'start'));  // startstarthello
console.log(str2.padEnd(15,'end'));  // helloendendende
console.log(str2.padStart(2)); // hello

console.log(str2.padStart(15,null));  // nullnullnuhello
console.log(str2.padStart(15,[]));  // hello   注意：特殊的
console.log(str2.padStart(15,{}));  // [object Obhello
console.log(str2.padStart(15,true)); // truetruetrhello

// 这两个方法都有两个参数  第一个：字符串目标长度(小于等于字符本身长度时，返回字符本身)  第二个：以什么东西填充(可以不是字符串)

console.log('-----------------------------------------------------');

// 7.Object.getOwnPropertyDescriptors()
const obj1 = {
  name: 'swk',
  type: 'monkey'
}

console.log(Object.getOwnPropertyDescriptors(obj1));  // 这个方法 要的是对象的属性描述符
// {name: {…}, type: {…}}
// name: {value: 'swk', writable: true, enumerable: true, configurable: true}
// type: {value: 'monkey', writable: true, enumerable: true, configurable: true}

console.log('-----------------------------------------------------');

// 8. rest/spread属性
// ...rest 剩余参数
function hsFn(q1,q2,...rest) {
  console.log(q1,'111',q2,'222',...rest);   // 打印结果  4 '111' 6 '222' 4 3 2 1
  // 在不确定函数参数的个数时可以使用 ...rest 来接收
  // 还有一个函数参数默认值  注意
}
hsFn(4,6,4,3,2,1)

const obj2 = {
  name: 'ed',
  type: 'unknow'
}
const d = {key: 'value'}
console.log({...obj2,...d}); // 打印结果: {name: 'ed', type: 'unknow', key: 'value'}
// 利用 spread 这种特性可以将对象合并，数组合并，但要注意，如果对象中 key 冲突，则后面的会覆盖前面的

console.log('-----------------------------------------------------');

// 9.正则的 exec 方法，匹配字符串中有没有符合正则的字段，如果有 => 返回一个数组，数组里面是 正则和子正则 的匹配结果
const reg = /([0-9]{4})-([0-9]{2})-([0-9]{2})/
const str3 = '111112022-08-02'
const match = reg.exec(str3)
console.log(match); // 打印结果如下：
// ['2022-08-02', '2022', '08', '02', index: 5, input: '111112022-08-02', groups: undefined]
// 0: "2022-08-02"
// 1: "2022"  // 这个包含下面两个都是子正则匹配的结果
// 2: "08"
// 3: "02"
// groups: undefined
// index: 5  // 从零开始第五位 匹配到正则
// input: "111112022-08-02"

console.log('-----------------------------------------------------');

// 10.正则表达式相反声明
const str4 = 'username:admin=abc123'
const code1 = str4.match(/(.*)admin=/)[1]   // 找到 admin= 前面的字段
const code2 = str4.match(/admin=(.*)/)[1]   // 找到 admin= 后面的字段
console.log(code1);  // 结果 => username:
console.log(code2);  // 结果 => abc123

console.log('-----------------------------------------------------');

// 11.Array.flat() 和 Array.flatMap()
const arr2 = [2,3,4,[5,6,7,8]]
console.log(arr2.flat());  // 打印结果为： [2, 3, 4, 5, 6, 7, 8]
console.log([1,[2,3],[4,[5,6]]].flat(Infinity));  // 打印结果： [1, 2, 3, 4, 5, 6]
// Array.flat() 这个方法将嵌套数组变成一维数组，不会改变原数组

const arr3 = [1,2,3,4]
console.log(arr3.map(x => [x * 2]));  // 打印结果为：[[2],[4],[6],[8]]
console.log(arr3.flatMap(x => [x * 2]));  // 打印结果为：[2, 4, 6, 8]
console.log(arr3.map(x=> x * 2)); // 打印结果为：[2, 4, 6, 8]

console.log('-----------------------------------------------------');

// 12.matchAll() 方法
const reg2 = /t(e)(st(\d?))/g
const str6 = 'test1test2'
const arr4 = [...str6.matchAll(reg2)]
console.log(arr4);  // 打印结果如下：
// [Array(4), Array(4)]  
// 0: (4) ['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', groups: undefined]
// 1: (4) ['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', groups: undefined]

console.log('-----------------------------------------------------');

// 13.Object.fromEntries()  将键值对列表转换为一个对象
const entries = new Map([
  ['foo','bar'],
  ['baz',42]
])
const e = [
  ['foo','bar'],
  ['baz',42],
  ['sss',33]
]

const obj3 = Object.fromEntries(entries)
console.log(obj3);   // {foo: 'bar', baz: 42}
console.log(Object.fromEntries(e));   // {foo: 'bar', baz: 42, sss: 33}

console.log('-----------------------------------------------------');

// 14.空值合并操作符  ？？
const f = 0
console.log(f || 'zh');  // zh
console.log(f ?? 'zh');  // 0
// 如果 f 未定义 则取 ?? 后面的值，如果 f 定义了，取的就是 f 的值
// 就是为了有时候 变量的值为 0 或者 false 但是它定义了，还是取它本身的值
//  ?? 和 || 和 && 不能同时使用，除非利用 () 明确指定了优先级
let g   // 只声明了，，未定义
console.log(g ?? 'en');  // en

console.log('-----------------------------------------------------');

// 15.Object.assign   合并对象、复制对象
const obj4 = {
  a: '123',
  b: '456'
}
const obj5 = {
  b: '789',
  d: 'abc'
}
// Object.assign 方法两个参数，第一个目标对象，第二个要合并的对象
console.log(Object.assign(obj4,obj5));  // 打印结果: {a: '123', b: '789', d: 'abc'}
// console.log(obj4);  // 打印结果: {a: '123', b: '789', d: 'abc'}
// console.log(obj5);  // 打印结果: {b: '789', d: 'abc'}
// 改变目标对象，，要合并的对象没有改变

// 复制对象
const obj6 = Object.assign({},obj5)
console.log(obj6);
obj5.d = 'qwe'
console.log(obj5,obj6);  // 打印结果：{b: '789', d: 'qwe'} {b: '789', d: 'abc'}
// 所以复制的对象指向的不是被复制的对象了，两个对象是独立的   只有一层的话是深拷贝

// Object.is 判断两个值是否相同，，不是相等（注意）
console.log(Object.is(NaN,NaN));  // 相同  true
console.log(NaN === NaN);  // 相等  false
// 类型不一样也不会返回true，两个对象，尽管属性、值都相同，同样返回false

console.log('-----------------------------------------------------');

// 16.trimStart 和 trimEnd 方法  去除开头和结尾的空格
const str7 = '   kkk   '
console.log('111' + str7.trimStart()+'111');  // 打印结果： 111kkk   111
console.log('111' + str7.trimEnd()+'111');  // 打印结果： 111   kkk111

const h = Symbol('Tom')
console.log(h.description);  // 打印结果：Tom

console.log('-----------------------------------------------------');

// 17.类的私有属性
class Person {
  // 公有属性
  name;
  // 私有属性
  #age;
  #weight;
  constructor(name,age,weight) {
    this.name = name
    this.#age = age
    this.#weight = weight
  }
  info() {
    console.log('名字叫'+this.name+ '的小老鼠' + this.#age +'岁了'+ '只有'+this.#weight + '重');
  }
}

const girl = new Person('jerry',1,'1kg')
console.log(girl.name);  // 打印结果为：jerry
girl.info() 
// console.log(girl.#age);  获取不到#age 这个属性，因为它是私有的

console.log('-----------------------------------------------------');

// 18.Promise.allSettled 跟 Promise.all 类似，都是处理一组promise 的方法，但是 Promise.all 对每一个promise都要返回正确的状态，如果不是，那后面的 promise就不会在执行，但是 Promise.allSettled 不会，它会返回所有的结果(一个数组)，当成一个 resolve 返回
const p1 = new Promise(function(resolve,reject){
  setTimeout(()=> {
    reject('p1')
  },1000)
})

const p2 = new Promise(function(resolve,reject){
  setTimeout(()=> {
    reject('p2')
  },2000)
})

const p3 = Promise.resolve('p3')

const p4 = Promise.resolve('p4')

Promise.allSettled([p1,p2,p3,p4]).then((args)=> {
  // console.log(args);  // 异步结果，不打印了，容易混淆
})
// 失败的promise，status 返回的是 rejected，reason 代表失败的原因
// 成功的promise，status 返回的是 fulfilled，value 代表 promise 返回的结果
// 0: {status: 'rejected', reason: 'p1'}
// 1: {status: 'rejected', reason: 'p2'}
// 2: {status: 'fulfilled', value: 'p3'}
// 3: {status: 'fulfilled', value: 'p4'}
// length: 4

console.log('-----------------------------------------------------');

// 19.可选链操作符 ?.
const obj7 = {
  a: '23',
  b: {
    c: '56'
  }
}
console.log(obj7?.b?.c);   // 打印： 56
// 代表的是obj7 && obj7.b && obj7.b.c
console.log(obj7?.a?.d);  // 打印： undefined
console.log(obj7.a.d);  // 打印： undefined
// 运用场景：接口返回了一个对象，要访问对象中属性，但不确定这个属性是否存在，那么就可以用这个操作符
// 用 ?. 不可以赋值，在对象、数组或者调用函数 都可以使用

console.log('-----------------------------------------------------');

// 20.globalThis 永远指向 window 这个顶级对象
(()=> {
  class Ghost {
    info() {
      console.log(this);   // 打印结果为： 指向 Ghost
      console.log(globalThis);  // 打印结果为： 指向 Window
    }
  }
  
  const ghost = new Ghost()
  ghost.info()
})()

console.log('-----------------------------------------------------');

// 21.bigint  在js中超过16位就会丢失精度，统一使用 Bigint() 
// Bigint() 是一种特殊的数字类型（注意：bigint是一个数据类型），它支持任意长度的整数，且不可以与 number 混用。Bigint() 是内置对象
// const bigint1 = 900000000099999999
// console.log(bigint1);   // 这样就会丢失精度
const bigint2 = 900000000099999999n
console.log(bigint2);

const alsoHuge = BigInt(0865423456787654334567)
console.log(alsoHuge);  // 865423456787654377472n
// Bigint() 当构造函数使用，但不使用 new 来声明，括号里面传入一个数值（二进制、八进制、十六进制都不影响）或者一个字符串（'55152656123156441322'）都行
// 运算跟 js 一样，还可以跟 number 进行比较 2n < 3 这是 true  运算： 4n - 2n = 2n 

console.log('-----------------------------------------------------');

// 22.symbol 数据类型   定义的属性独一无二（不会与原来的属性名冲突）
// symbol 类型涉及到运算的  一律报错      因为涉及到 toNumber 所以报错
let s = Symbol('test')
console.log(s,typeof s);   // 打印结果：Symbol(test) 'symbol'
console.log(s.toString());  // 打印结果：Symbol(test)
// console.log(s.toNumber());  // 报错
console.log(s.description);  // 打印结果：test
```

#### 22.字体图标有时在项目中出现乱码问题？

```javascript
css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          outputStyle: 'expanded'
        }
      }
    }
  },
  // 在vue.config.js 文件配置
  // 原因：因为sass默认输出格式为expanded，编译时不会转换Unicode字符，而sassLoader修改了sass默认输出格式为compressed，现在将sassLoader的输出格式手动修改为expanded
```

#### 23. 手写call、apply、bind 方法

```javascript
// 23.call、apply、bind 的手写代码
const mbs = {
  name: 'mbs',
  say(ming,age) {
    console.log(`${ming} is a boy,just ${age}`);
  }
}

const A = {
  name: 'qwe'
}

mbs.say('wer','12')
// call 方法，可以接受任意多个参数，但是要求，第一个参数必须是 待指向的对象(A)，剩下的参数，都传入借过来使用的函数(say)中
mbs.say.call(A,'eddd',5)

// 手写call方法
Function.prototype.mycall = function(target,...args) {
  // javascript 要求，当我们 target 传入的是一个非真值的对象时，target 指向 window
  target = target || window
  // 为了防止对象里面的属性重复，这里利用 symbol 类型（独一无二）
  const symbolkey = Symbol()
  // 保存 this 指向
  console.log(this);  // 这里的 this 代表的是 say 这个方法
  target[symbolkey] = this
  // 调用 借过来的函数，并传入参数
  const res = target[symbolkey](...args)
  // 删除掉这个方法
  delete target[symbolkey]
  // 返回结果
  return res
}
console.log(mbs);
mbs.say.mycall(A,'eddd',5)

// apply 方法是传入两个参数，第一个参数是 待指向的对象，第二个参数是一个数组，里面的元素是借来函数的参数

// 手写 apply 方法
Function.prototype.myapply = function(target,args) {
  // javascript 要求，当我们 target 传入的是一个非真值的对象时，target 指向 window
  target = target || window
  // 利用 symbol 是一个独一无二的类型，防止与本来的属性重复
  const symbolkey = Symbol()
  // 保存this
  target[symbolkey] = this
  // 这里的 res 是一个数组，所以需要进行解构
  const res = target[symbolkey](...args)
  // 删除这个自己写的方法
  delete target[symbolkey]
  // 返回结果
  return res
}

// bind 方法 返回值是一个函数（注意） 参数只有一个 待指向的对象

// 手写 bind 方法
Function.prototype.mybind = function(target,...outargs) {
  // 处理边界条件
  target = target || {}
  const symbolkey = Symbol()
  target[symbolkey] = this
  // 返回一个函数
  return function ( ...innerargs) {
    const res = target[symbolkey](...outargs,...innerargs)
    delete target[symbolkey]
    return res
  }
}
```

#### 24. JavaScript的几种类型

​	1.number

​	2.string

​	3.boolean

​	4.undefined

​	5.null

​	6.引用类型，也就是object （object、array、function）

​	7.symbol  独一无二的（定义属性时防止与它自身的属性冲突）

​	8. `Bigint` 大数据，防止 number 失真

#### 25. `Vue` 的运行流程

​	首先是 instance 里面的 `Vue` 的构造函数，里面贯穿了整个流程。

​	1.先是 定义 `Vue.prototype._init` 方法（这个方法做了以下事情）

​		初始化 实例身上的组件关系，如：`$parent` 、`$children`、 `$root` 、`$refs` 

​		初始化实例上的自定义事件（谁注册、谁监听）

​		解析插槽信息，得到 `vm.$slot`，处理渲染函数，得到 `vm.$createElement` 方法，即 h 函数

​		调用 `beforeCreate` 钩子函数

​		初始化组件的 inject 配置项,得到 `result[key] = val` 形式的配置对象，然后对结果数据进行响应式处理，并代理每个 key 到 `vm` 的实例

​		数据响应式的重点，处理 props methods data computed watch

​		解析组件配置项的 provide 对象，将其挂载到 `vm.$provided` 属性上

​		调用 created 钩子函数

​	2.在实例上定义了 ` Vue.prototype.$data` 、  `Vue.prototype.$props` 、  ` Vue.prototype.$set` 、   	`Vue.prototype.$delete` 、 `Vue.prototype.$watch` 这几种方法，也对这几种方法进行处理

​	3.在实例上定义 ` Vue.prototype.$on` 、` Vue.prototype.$once` 、 ` Vue.prototype.$off` 、  ` Vue.prototype.$emit` 这几种方法，主要对实例上的自定义事件进行处理

​	4.在实例上定义 `Vue.prototype._update` 、 ` Vue.prototype.$forceUpdate` 、 ` Vue.prototype.$destory` 这几种方法，在首次渲染和页面更新都会走这里

​	5. 在实例上定义 `Vue.prototype._render` 、 ` Vue.prototype.$nextTick` 这几种方法，通过之前的 render 函数生成 `vnode` 渲染页面

#### 26.遍历数组的几种方法

​	every ： 遍历数组每一项，如果有一项不满足条件则返回false（后面也不会在执行），都满足，则返回true

​		注意： every 不会对空数组进行检测，也不会改变原数组

​	filter： 遍历数组每一项，返回符合条件的数组元素（筛选）

​		注意： filter不会对空数组进行操作，也不会更改原数组

​	some： 遍历数组每一项，如果找到一项满足条件的元素，则会返回true（但是它会把循环走完），找不到满足条件的元素，则返回false

​		注意：some不会对空数组进行操作，也不会更改原数组

​	map： 遍历数组每一项，将数组的每一个元素都进行处理，返回新数组

​		注意： map不会对空数组进行操作，也不会更改原数组

​	reduce： 可以当做一个累加器（求和）

​		注意： 同样返回一个新数组，不对空数组进行操作

#### 27.Map 类型

​	 `Es6` 新增： Map 类型，类似于对象的数据类型（它也是键值对形式存储数据，但键可以是数值，函数之类的）

​	map自带的方法： get（）读取、set（）设置、clear（）清除、has（）判断里面有没有这个字段、delete（）删除某个字段

#### 28.  `js`的设计模式

​	最基础的：工厂模式（普通工厂模式以及抽象工厂模式） ？？？还要再看

​	普通工厂模式：就是利用类定一个对象，但是对象多的话，类也会增多（占有内存增大）

​	抽象工厂模式：创建一个抽象类来生成类

​	订阅者模式

​	观察者模式

​	建造者模式？？？？？？？

​	