// // class 的实例方法
// class point {
//     x = 1
//     y = 2
//     ss(n:number) {
//         this.x *= n
//         this.y *= n
//     }
// }
// const p  = new point()
// p.ss(100)
// console.log(p.x)
// // console.log(p.y)
// // class 继承(extends)  子类可以继承父类的属性和方法
// class a {
//     move() {
//         console.log('a')
//     }
// }
// class b extends a {
//     move1() {
//         console.log('b')
//     }
// }
// const c = new b()
// c.move()
// console.log(c.move(),c.move1())
// class 继承2(implements a)

// interface a {
//     name:string
//     move():void
// }
// class op implements a {
//     name = "李洋"
//     move():void {
//         console.log('hello world')
//     }
// }
// const d = new op()
// console.log(d.name, d.move())

// class 可见类修饰符(public)
// class p {
//     public move() {
//         console.log('hello world')
//      }
// }
// const e = new p()
// e.move()
// class 可见类修饰符protected（受保护的 ）
// // 含义：被 protected 修饰的属性或方法，只能在当前类内部以及子类中访问，在类的实例（外部）无法直接访问 。
// class p {
//     protected move1() {
//         console.log('hello world')
//     }

// }
// class c extends p {
//     move() {
//         console.log('hello')
//         // 调用 move1 方法
//         this.move1()
//     }
// }
// const f = new c()
// // 调用 move 方法
// f.move()
// class 可见类修饰符(private)
// 用 private 修饰类的属性 / 方法后，仅限当前类内部访问，
// 类的实例（外部创建的对象）、子类都无法直接访问 。
// class a {
//     private move1() {
//         console.log('hello world')
//     }
//   move2() {
//         this.move1()
//     }
// }
// const g = new a()
// g.move2()
// class readonly 它是一个只读属性，只能在构造函数(constructor)中初始化，
// // // 之后就不能再修改了。
// class a {
//     readonly name: string;
//     constructor(name: string = "lidaye") {
//         this.name = name;
//     }
// }
// // 创建实例时不传入参数
// const p = new a();
// console.log(p.name); // 输出: lidaye

// // 创建实例时传入参数
// const p2 = new a('new name');
// console.log(p2.name); // 输出: new name



// // 类型兼容性(对象之间)
// class Point {
//     x: number
//     y: number
// }
// class Point2D {
//     x: number
//     y: number
// }

// // No issues here, Point2D is compatible with Point
// const p: Point = new Point2D();

// class Point3D {
//     x: number
//     y: number
//     z: number
// }

// // No issues here, Point3D is compatible with Point
// const p1: Point = new Point3D();

// interface a {
//     name: string
//     age: number
// }
// interface b {
//     name: string
//     sex: string
//     age: number
// }
// // 创建一个符合 b 接口的对象
// const objB: b = {
//     name: "张三",
//     sex: "男",
//     age: 20
// };
// // 将符合 b 接口的对象赋值给类型为 a 的变量
// const p: a = objB;
// console.log(p)

// 类型兼容性(函数之间)
// 它是参数少的赋值给多的
// 定义类型 a，接收一个字符串参数，无返回值
// type a = (name: string) => void;
// // 定义类型 b，接收一个字符串和一个数字参数，无返回值
// type b = (name: string, age: number) => void;

// // 定义一个符合类型 a 的函数
// const funcA: a = (na: string) => {
//     console.log(`传入的字符串是: ${na}`);
// };

// // 将符合类型 a 的函数赋值给类型 b 的变量
// let f1: b = funcA;

// // 调用 f1 函数
// f1('张三', 20);

// 交叉类型
// 交叉类型（&）：功能类似于接口继承（extends），用于组合多个类型为一个类型（常用于对象类型）。
// type a = {
//     name: string
// }
// type b = {
//     age: number
// }
// type c = a & b
// let obj: c = {
//     name: '张三',
//     age: 20
// }
// console.log(obj)

// interface a {
//     name: string
// }
// interface b {
//     age: number
// }
// // 直接定义交叉类型
// type c = a & b;

// let obj: c = {
//     name: '张三',
//     age: 200000000000000000
// }
// console.log(obj)

// 接口类型和交叉类型的区别
// 接口类型：接口类型是一种类型定义，用于描述对象的形状。接口类型可以包含属性、方法、索引签名等。
// 交叉类型：交叉类型是一种类型组合，用于将多个类型合并为一个类型。交叉类型可以包含多个类型的属性和方法。

// 4.4 泛型
// 泛型的基本使用
// 泛型是可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现复用，常用于：函数、接口、class 中。
// 需求：创建一个 id 函数，传入什么数据就返回该数据本身（也就是说，参数和返回值类型相同）。
// const id = <T>(value: T): T => {
//     return value
// }
// let a: number = id<number>(100)
// const b: string = id<string>('hello world')
// console.log(a, b)

// 简化泛型函数的使用
// const id = <T>(value: T): T => {
//     return value
// }
// let a: number = id(100)

// 泛型约束(1.指定更加的数据类型)
// 泛型约束：可以对泛型进行约束，只允许传入某些类型。
// 需求：创建一个 id 函数，传入的参数必须是 number 类型，返回值也必须是 number 类型。

const ID = <Type>(value: Type[]): Type[] => {
    value.length
    return value
}
// console.log(ID("111111111"))