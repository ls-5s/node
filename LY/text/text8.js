undefined
null
Number
Boolean
string 
Symbol
console.log(typeof)
// 隐性转换核心规则总结：
// 数字 + 字符串 = 字符串拼接
// 数字 + 布尔值 = 数字运算（true→1，false→0）
// 字符串 - 数字 = 数字运算（字符串转数字）
// 字符串 * 数字 = 数字运算
// // 字符串 / 数字 = 数字运算
// // 字符串转数字规则：
// console.log(+"12341");    // 合法数字字符串直接转换 → 12341
// console.log(+"12341abc"); // 含非数字字符无法完整转换 → NaN

// // 对比 parseInt 的处理差异：
// console.log(parseInt("12341abc"));  // 输出 12341（提取数字部分）
// console.log(Number("12341abc"));    // 输出 NaN（必须完整转换）
// // 1. Number() - 最严格的转换方式
// console.log(Number("123"));      // 123 (纯数字字符串)
// console.log(Number("123abc"));   // NaN (包含非数字字符)
// console.log(Number(true));       // 1 (布尔值转数字)
// console.log(Number(null));       // 0 (null转0)
// console.log(Number(undefined)); // NaN (undefined无法转换)

// // 2. parseInt() - 提取整数部分
// console.log(parseInt("123px"));  // 123 (提取数字部分)
// console.log(parseInt("12.9"));   // 12 (丢弃小数部分)
// console.log(parseInt("abc123")); // NaN (开头非数字)

// // 3. parseFloat() - 提取浮点数
// console.log(parseFloat("12.34")); // 12.34 (保留小数)
// console.log(parseFloat("12.3.4")); // 12.3 (遇到第二个小数点停止)

// // 4. String() - 通用转字符串
// console.log(String(123));        // "123"
// console.log(String(null));       // "null" 
// console.log(String(undefined));  // "undefined"

// // 5. Boolean() - 转布尔值
// console.log(Boolean(1));        // true (非零数字)
// console.log(Boolean(0));        // false (零)
// console.log(Boolean(""));       // false (空字符串)
// console.log(Boolean("0"));      // true (非空字符串)

// 6. toString() - 对象方法转换
// const num = 123;
// console.log(num.toString());    // "123" (注意：null/undefined不能用)
const arr = []
const arr1 = new Array(1,2,3)
console.log(arr.length)
arr.push()
arr.unshift()
arr.pop()
arr.shift()
arr.splice(1,1,'aaa')

数组的操作方法
// const p = arr.find(x => {
//     return x > 2
// })// 查找大于2 的第一个元素
// console.log(p)

// const arr = [1, 2, 3, 4]
// const p = arr.every(x => {
//     return x > 0
// }) // true（是否所有元素都符合条件）
// console.log(p)

// const arr = [1, 2, 3, 4]
// const p = arr.some(x => {
//     return x > 3
// }) // true（是否存在符合条件的元素）
// console.log(p)
// const ss = arr.map((item,index)=> {
//     return item * 2
// })
// 返回一个新的数组
const ss = arr.filter(()=> {
    return x > 2
})
arr.forEach((item,index)=> {
    console.log(item,index)
})
const sum = arr.reduce((item,index)=>{
    return item + index
},0)
arr.sort((a,b)=> b- a)

// yarn add vue-router@3.6.5
// import VueRouter from 'vue-router'
// vue.use(VueRouter)
// const router = new VueRouter({
//     routes: [
//         {
//             path: '/',
//             component: () => import('./home.vue')
//         }
//     ]
// // })
// import vue from 'vue'
// import VueRouter from 'vue-router'
// vue.use(VueRouter)
// const router = new VueRouter({
//     routes: [
//         {
//             path: '/',
//             component: () => import('./home.vue')
//         }
//     ]
// })
