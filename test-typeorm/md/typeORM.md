# 数据库的连接

```js
建立与 MySQL 数据库的连接，并定义数据模型与数据库表的映射关系
在migrate文件夹下执行
创立data-source.ts文件
// 引入反射元数据库，TypeORM 需要此库支持装饰器功能（如 @Entity、@Column 等）
import "reflect-metadata";
// 从 typeorm 引入 DataSource 类，用于创建和管理数据库连接
import { DataSource } from "typeorm";
// 引入 User 实体类，该类映射到数据库中的 user 表
import { User } from "./entity/User";

// 创建并导出数据库连接实例 AppDataSource
export const AppDataSource = new DataSource({
    // 指定数据库类型为 MySQL（支持 PostgreSQL、SQLite 等其他类型）
    type: "mysql",
    // 数据库主机地址（本地数据库为 localhost）
    host: "localhost",
    // 数据库端口（MySQL 默认端口为 3306）
    port: 3306,
    // 数据库登录用户名
    username: "root",
    // 数据库登录密码
    password: "123456",
    // 要连接的数据库名称
    database: "test",
    // 是否自动同步实体与数据库表结构（开发环境常用，生产环境建议关闭）
    // 启用后，TypeORM 会根据实体类自动创建/更新表结构
    synchronize: true,
    // 是否开启 SQL 日志（true 时会在控制台输出执行的 SQL 语句，便于调试）
    logging: false,
    // 指定需要加载的实体类数组（User 实体将被映射到数据库表）
    entities: [User],
    // 数据库迁移脚本存放路径（用于版本化管理表结构，此处暂未配置）
    migrations: [],
    // 数据库事件订阅器（用于监听数据库事件，此处暂未配置）
    subscribers: [],
});
```
# 定义一张表
```js
在entity下，定义一个uers.ts

// 从 typeorm 库中导入必要的装饰器
// Entity：标记类为数据库实体（对应一张表）
// PrimaryGeneratedColumn：标记为主键列，且值会自动生成
// Column：标记为普通列（对应表中的字段）
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// @Entity() 装饰器：将 User 类声明为数据库实体
// 默认情况下，会在数据库中创建名为 "user" 的表（类名小写）
// 若需自定义表名，可写成 @Entity("custom_users")
@Entity()
export class User {

    // @PrimaryGeneratedColumn()：标记为主键列
    // 会自动生成唯一值（类似 MySQL 的 AUTO_INCREMENT）
    // 映射到表中为 int 类型的 id 字段，且为主键
    @PrimaryGeneratedColumn()
    id: number

    // @Column()：标记为普通列
    // 类型根据 TypeScript 类型推断（string 对应数据库的 varchar）
    // 映射到表中为 varchar 类型的 first_name 字段（驼峰转下划线）
    @Column()
    firstName: string

    // 同上，映射到表中为 varchar 类型的 last_name 字段
    @Column()
    lastName: string

    // 类型为 number，映射到表中为 int 类型的 age 字段
    @Column()
    age: number

}
```
##  @Column() 装饰器 的详细配置
```js
// @Column() 装饰器可以接受多个参数来配置列的属性
@Column({
    name: "first_name", // 自定义数据库字段名，默认与属性名相同
    type: "varchar", // 数据库字段类型，默认根据 TypeScript 类型推断 指定字段类型（type）
    length: 255, // 字段长度（对字符串类型有效）
    nullable: false, // 是否允许为空（默认 false）
    default: "unknown", // 默认值
    unique: false, // 是否唯一约束
    primary: false, // 是否主键
    comment: "用户姓名", // 字段注释（数据库中可见）
})
firstName: string;

```
# 数据库
## 保存数据
```js
// 导入数据库连接配置实例（包含数据库连接信息）
import { AppDataSource } from "./data-source"
// 导入 User 实体类（映射数据库中的 user 表）
import { User } from "./entity/User"

// 初始化数据库连接
// initialize() 方法返回 Promise，连接成功后执行 then 中的回调函数
AppDataSource.initialize().then(async () => {
   // 创建一个 User 实体实例（内存中的对象，尚未存入数据库）
   const user = new User()
   // 给实例的属性赋值（对应数据库表中的字段）
   user.firstName = "Timber"  // 设置 firstName 字段值
   user.lastName = "Saw"      // 设置 lastName 字段值
   user.age = 25              // 设置 age 字段值

   // 通过 EntityManager 将用户实例保存到数据库
   // 相当于执行 SQL: INSERT INTO user (firstName, lastName, age) VALUES ('Timber', 'Saw', 25)
   await AppDataSource.manager.save(user)
   // 保存成功后，数据库会自动生成 id 并赋值给 user.id（自增主键）

}).catch(error => console.log(error))  // 如果数据库连接失败或保存过程出错，捕获并打印错误信息
```
## 查找数据
### 写法 1：简单对象匹配（等值条件）(findone 查找一条数据)

直接传对象，键是实体属性，值是要匹配的内容，默认是 等值（=）匹配。
```js
// 查找年龄为 25 且姓名为 "Timber" 的用户

const users =await AppDataSource.manager.find({
    where: {
        age: 25,
        firstName: "Timber",
    }
})
console.log(users)
```
### 复杂条件（用数组 / 操作符）
```js   
// 使用数组表示多个条件，等价于 SQL 的 OR 条件
const users =await AppDataSource.manager.find({
    where: [
        { age: 25 },
        { firstName: "Timber" },
    ]
})
console.log(users)

where: [
  { nick: '张三', salary: MoreThan(50000) }, // 条件1：nick=张三 且 salary>50000
  { nick: '李四' } // 条件2：nick=李四
]
```
### 常用 “查询操作符”（需要从 TypeORM 导入）
```js
操作符	作用	示例（结合 where）	等价 SQL 片段
Equal	等值（=）	{ salary: Equal(50000) }	salary = 50000
Not	不等（≠）	{ salary: Not(50000) }	salary != 50000
MoreThan	大于（>）	{ salary: MoreThan(50000) }	salary > 50000
MoreThanOrEqual	大于等于（≥）	{ salary: MoreThanOrEqual(50000) }	salary >= 50000
LessThan	小于（<）	{ salary: LessThan(50000) }	salary < 50000
LessThanOrEqual	小于等于（≤）	{ salary: LessThanOrEqual(50000) }	salary <= 50000
Like	模糊匹配（%...%）	{ nick: Like('%三%') }	nick LIKE '%三%'
In	包含在数组内（IN）	{ id: In([1,2,3]) }	id IN (1,2,3)
Between	介于两者之间（BETWEEN）	{ salary: Between(50000, 100000) }	salary BETWEEN 50000 AND 100000
```
### 完整示例（结合多种条件）
```js
import { MoreThanOrEqual } from "typeorm";

// 假设 User 实体关联了 Profile
const users = await userRepository.find({
  // 筛选条件：(salary ≥ 50000 或者 nick = '张三') 
  where: [
    { salary: MoreThanOrEqual(50000) },
    { nick: '张三' }
  ],
  // 连表查询：同时查关联的 profile 数据
  relations: ["profile"],
  // 只返回这些字段
  select: ["nick", "salary", "profile.gender"], 
  // 排序：按 salary 降序，再按 id 升序
  order: {
    salary: "DESC",
    id: "ASC"
  },
  // 分页：取第 2 页，每页 10 条
  take: 10,
  skip: 10
});
```
## 删除数据
```js
// 删除 id=1 的用户
const user = await userRepository.findOne({ where: { id: 1 } });
await userRepository.remove(user);
console.log("用户已删除");
```
