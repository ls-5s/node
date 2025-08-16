# 基础数据类型
```ts
// 原始类型
let age:number = 18
let myname:string = '张三'
let ismale:boolean = true
let sex:symbol = Symbol('男')
let info:null = null
let info2:undefined = undefined
```
# 数组类型
```ts
let arr:number[] = [1,2,3]
let arr2:string[] = ['a','b','c']
let arr3:boolean[] = [true,false,true]
```
# 联合类型
```ts

// 添加小括号，表示: 首先是数组，然后，这个数组中能够出现 number 或 string 类型的元素
let arr5: (number | string)[] = [1, 3, 5, 'a', 'b']
// 不添加小括号，表示: arr1 既可以是 number 类型，又可以是 string[]
 // 类型别名
type MyType = (number | string)[]
let arr5:MyType = [1,2,3,'a','b']
```
# 函数类型
```ts
函数类型 （1 单独指定参数和返回值的类型）
const arr8 = (x:number,y:number):number => {
    return x + y
}
console.log(arr8(1,2))
// 函数类型 （2  同时指定参数和返回值的类型）
const arr9:(x:number,y:number) => number = (x,y) => {
    return x + y
}
console.log(arr9(1,2))


// 函数的void类型
const greet = (name: string): void => {
    console.log('Hello', name)
}

函数的可选参数
可选参数定义方式：在可传可不传的参数名称后面添加 ?（问号）
规则约束：可选参数只能出现在参数列表的最后，即可选参数后面不能再出
现必选参数 ，用于辅助理解 TypeScript 里函数参数类型定义中 “
单独指定参数和返回值的类型” 
场景里，对参数类型（尤其是可选参数）的规范用法 。
const getInfo = (name: string, age?: number): void => {
    console.log(name, age)
}

```
# 对象类型
```ts
// 对象类型
let person:{name:string,age:number,greet(name:string):void} = {
    name:'张三',
    age:18,
    greet(name:string){
        console.log('你好',name)
    }
}
// 对象的可选属性，规则和上面一样
let person2:{name:string,age?:number} = {
    name:'张三'
}
```
# 接口
```ts
interface op {
    name:string,
    age?:number
}
let person3:op = {
    name:'张三',
    age:18
}
// 接口的可选属性
type op2 ={
    name:string,
    age?:number
}
let person4:op2 = {
    name:'张三',
    age:18
}

接口的继承

interface op {
    name:string,
    age?:number
}
interface op2 extends op {
    sex:string
}
let person5:op2 = {
    name:'张三',
    age:18,
    sex:'男'
}
```
# 元组类型
```ts
元组类型
const arr10: [number, string] = [1, 'a']
// 类型推论
let xx = 18
const sum  = (x:number,y:number) => {
    return x + y
}
console.log(sum(1,2))


// 类型断言
const box = document.querySelector('.box') as HTMLDivElement; 
console.log(box)

```
# 字面量类型
```ts
let a = 10 
console.log(typeof a)
const c:'hello' = 'hello'
const b = 'hello'
// console.log( typeof b)
const a = (xx:'up'|'down'|'left'|'right') => {
  console.log(xx)
}
a('up')
```
# 枚举类型
```ts
enum Color {
    Red,
    Green,
    Blue
}
// 成员设置初始值:

enum Direction {
  Up = 10,
  Down,
  Left,
  Right
// }

enum Direction {
    Up = 2,
    Down = 4,
    Left = 8,
    Right = 16
}

function changeDirection(direction: Direction) {
    console.log(direction)
 }
 changeDirection(Direction.Up)
字符串枚举
enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}
const a = (xx:Direction) => {
    console.log(xx)
}
a(Direction.Up)
any 类型
let a:any = 18
console.log(typeof a)
```
# class 
```ts
class Person {
    name:string
    age:number
    constructor(name:string,age:number){
        this.name = name
        this.age = age
    }
}
const p1 = new Person('张三',18)
console.log(p1.name,p1.age)
```
