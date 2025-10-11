三、面试常考题（附答案）
1. 基础题："1" + 2 + 3 和 1 + 2 + "3" 的结果分别是什么？为什么？
答案：
"1" + 2 + 3 结果为 "123"
1 + 2 + "3" 结果为 "33"
原因：+ 运算符按从左到右顺序执行：
第一个表达式："1" + 2 先触发字符串拼接，结果为 "12"，再与 3 拼接为 "123"；
第二个表达式：1 + 2 先执行算术运算得 3，再与 "3" 拼接为 "33"。
2. 原理题：NaN 是什么？如何判断一个值是否为 NaN？
答案：
NaN 是特殊的数字值，表示 “不是一个有效数字”（如 Number("abc")、0 / 0 等）。1
注意：NaN 不等于任何值，包括它自己（NaN === NaN 结果为 false）。
判断方法：使用全局函数 isNaN() 或更准确的 Number.isNaN()：
javascript
运行
console.log(isNaN(NaN)); // true
console.log(Number.isNaN("123abc")); // false（"123abc" 是字符串，不是 NaN）
console.log(Number.isNaN(Number("123abc"))); // true（先转为 NaN 再判断）

3. 场景题：如何将用户输入的 "123.45px" 转换为数字 123.45？
答案：可使用 parseFloat()，因为它会忽略字符串末尾的非数字字符：
javascript
运行
const str = "123.45px";
const num = parseFloat(str);
console.log(num); // 123.45（数字类型）
parseFloat() 函数会解析一个字符串参数并返回一个浮点数。
parseFloat() 的工作原理
从左到右解析：从字符串开头开始解析

识别数字部分：

识别 +/- 符号

识别数字 0-9

识别第一个小数点 .

遇到非数字字符停止：碰到 p 时停止解析

返回已解析的数字：返回 123.45

其他类似场景
javascript
// 各种字符串转数字的场景
parseFloat("123.45px")     // 123.45
parseFloat("88.8%")        // 88.8
parseFloat("$50.99")       // 50.99（注意：开头非数字返回NaN）
parseFloat("height: 100px") // NaN（数字不在开头）
parseFloat("123.45.67")    // 123.45（只识别第一个小数点）
意外的字符串拼接：如 1 + "2" = "12" 而非 3；

. parseInt 的第二个参数
题目：解释 parseInt("11", 2) 的结果是什么？parseInt 的第二个参数有什么作用？
答案：结果为 3。parseInt 的第二个参数是基数（radix），表示要解析的数字的进制（2~36 之间）。
parseInt("11", 2) 表示将二进制字符串 "11" 转为十进制，计算为 1*2 + 1 = 3。
若基数为 0 或省略，默认按十进制解析（但以 "0x" 开头会按十六进制）。
常见坑：parseInt("010") 在不同环境可能解析为 8（旧浏览器八进制）或 10（现代浏览器十进制），因此建议始终指定基数。

4. Number 与 parseInt 的区别
题目：Number(" 123 ")、parseInt(" 123 ")、Number("123abc")、parseInt("123abc") 的结果分别是什么？两者核心区别是什么？
答案：
Number(" 123 ") → 123（忽略首尾空格，严格转换）
parseInt(" 123 ") → 123（忽略首尾空格，宽松转换）
Number("123abc") → NaN（包含非数字字符，转换失败）
parseInt("123abc") → 123（从左到右取有效数字，遇到非数字停止）
题目：用户在输入框中输入 " 12.34元 "，如何提取其中的数字 12.34 并转为数字类型？
const input = " 12.34元 ";
const num = parseFloat(input);
console.log(num); // 12.34


前置自增（++a）：变量值先加 1，再参与表达式运算
后置自增（a++）：变量先参与表达式运算，再将值加 1

3. 场景题：如何将 “数组嵌套对象” 转换为 “以对象属性为键的对象”？
问题：将学生数组 students 转换为以 name 为键、学生对象为值的新对象（便于通过姓名快速查找学生）：
javascript
运行
// 目标格式：
{
  "小明": { name: '小明', age: 18, ... },
  "小红": { name: '小红', age: 19, ... },
  ...
}
答案：
javascript
运行
let studentsMap = {}; // 新对象
for (let i = 0; i < students.length; i++) {
  let student = students[i];
  let key = student.name; // 以姓名为键
  studentsMap[key] = student; // 将学生对象作为值存入新对象
}

// 快速查找：通过姓名获取学生信息
console.log(studentsMap["小明"].age); // 输出：18
console.log(studentsMap["小红"].hometown); // 输出：河南省

NodeList 不是数组：NodeList 是类数组，支持 length、索引访问、forEach，但不支持数组方法（如 push、filter、map）。若需用数组方法，需先转换为数组：
javascript
运行
const lisArray = Array.from(lisInLisClass); // NodeList → 数组
// 或 const lisArray = [...lisInLisClass];（展开运算符）
lisArray.filter(li => li.textContent.includes('A')).forEach(li => {
  li.style.color = 'orange'; // 筛选出含 "A" 的 li 并改色
});