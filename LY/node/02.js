 const obj = require('./01.js');

    // 调用导入的求和函数计算数组总和
    const sum = obj.arraysum([1, 222, 33]);

    // 输出计算结果（预期输出：256）
    console.log(sum);