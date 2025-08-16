# 怎么在后端使用typeORM
```js
安装
npm i typeorm
npm i database mysql2

怎么打开方式是npm start
在package.json中添加("scripts": {
    "start": "node app.js"
  },)
{
  "name": "api-proxy",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "express-jwt": "^8.5.1",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.14.3",
    "ollama": "^0.5.16",
    "typeorm": "^0.3.25",
    "uuid": "^11.1.0"
  }
}

```
# 设计一张表
## columns配置的基础
### type
```js
int 整数
varchar 字符串
text 文本
boolean 布尔值
```
### primary
```js
primary: true, // 是否主键false
```
### generated
```js
generated: true, // 是否自动增长false
generated:'uuid'
```
### length
```js
length: 255, // 字符串长度
```
### nullable 
```js
nullable: false, // 是否允许为空false
```
### unique
```js
unique: true, // 是否唯一false
强制字段值唯一，不允许重复
```
### default
```js
default: 'default value', // 默认值
    updatedAt: { // 最后更新时间
      type: "timestamp", // 类型为时间戳
      default: () => "CURRENT_TIMESTAMP", // 默认值为当前时间
      onUpdate: "CURRENT_TIMESTAMP" // 更新记录时自动更新为当前时间
    }
  }
```
### onUpdate
```js
onUpdate: 'CASCADE', // 更新时级联操作
```
## 一张表
```js
const {EntitySchema} =require('typeorm')

const Post = new EntitySchema ({
    name:'Post',
    tableName:'posts',
    columns: {
        id:{
            type:'int',
            primary:true,
            generated:true
        },
        name: {
            type:'varchar',
            length:255,
            nullable:false
        },
        sex: {
            type:'varchar',
            length:255,
            nullable:false
        },
        age: {
            type:'int',
            nullable:false
        },
        IDCard: {
            type:'varchar',
            length:100,
            nullable:false,
            unique:true
        },
        time: {
            type:'timestamp',
            default:()=>'CURRENT_TIMESTAMP'
        },
        updatedAt: { // 最后更新时间
            type: "timestamp", // 类型为时间戳
            default: () => "CURRENT_TIMESTAMP", // 默认值为当前时间
            onUpdate: "CURRENT_TIMESTAMP" // 更新记录时自动更新为当前时间
          }

    }

})
module.exports = {
    Post
}
```
# 数据库设计
## 多个数据库的连接
### 多数据库连接配置方法
```js
const { Post } = require('../entity/Post')
const { User } = require('../entity/User') // 假设的另一个实体
const { DataSource } = require('typeorm')
require('reflect-metadata')

// 第一个数据库连接（test数据库）
const TestDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test',
    entities: [Post], // 该数据库对应的实体
    synchronize: true,
    logging: false
})

// 第二个数据库连接（blog数据库）
const BlogDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'blog', // 不同的数据库名
    entities: [User], // 该数据库对应的实体
    synchronize: true,
    logging: false
})

// 导出所有数据源
module.exports = {
    TestDataSource,
    BlogDataSource
}
```
### 使用方法
```js
// 初始化连接
async function initializeConnections() {
    await TestDataSource.initialize()
    await BlogDataSource.initialize()
    console.log('所有数据库连接已初始化')
}

// 操作test数据库
async function getTestPosts() {
    const postRepository = TestDataSource.getRepository(Post)
    return await postRepository.find()
}

// 操作blog数据库
async function getBlogUsers() {
    const userRepository = BlogDataSource.getRepository(User)
    return await userRepository.find()
}
```
## 嵌入式实体

通过使用embedded columns，可以减少应用程序中的重复（使用组合而不是继承）。

嵌入列是一个列，它接受具有自己列的类，并将这些列合并到当前实体的数据库表中。

### 定义嵌入式实体

```js
例如:定义一个嵌入式实体Name
const { EntitySchema } = require('typeorm');

// 嵌入式Name结构定义
const Name = {
    columns: {
        firstName: {
            type: 'varchar',
            length: 100,
            nullable: false
        },
        lastName: {
            type: 'varchar',
            length: 100,
            nullable: false
        }
    }
};

module.exports = { Name };
    
```
### 嵌入实体到主实体(使用)
```js
const { EntitySchema } = require('typeorm');
const { Name } = require('./Name');

const User = new EntitySchema({
    name: 'User',
    tableName: 'user',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        // 嵌入Name结构
        ...Name.columns,
        email: {
            type: 'varchar',
            length: 255,
            unique: true
        }
    },
    relations: {
        messages: {
            type: 'one-to-many',
            target: 'Message',
            inverseSide: 'user',
            cascade: true
        }
    }
});

module.exports = { User };
    
```
## 继承
### 定义继承
```js
// Content.js（抽象基类，不对应实际表）
const { EntitySchema } = require('typeorm');

const Content = new EntitySchema({
  name: 'Content', // 基类名称
  abstract: true, // 标记为抽象类，不生成表
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    title: {
      type: 'varchar',
      length: 255,
      nullable: false
    },
    createdAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP' // 默认当前时间
    },
    updatedAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP' // 更新时自动刷新
    }
  }
});

module.exports = { Content };

```
### 使用继承
```js
// Photo.js
const { EntitySchema } = require('typeorm');
const { Content } = require('./Content');

const Photo = new EntitySchema({
  name: 'Photo',
  tableName: 'photo',
  extends: Content, // 继承基类
  columns: {
    // 子类特有字段
    url: {
      type: 'varchar',
      length: 500,
      nullable: false
    },
    size: {
      type: 'int', // 单位：KB
      nullable: false
    }
  }
});

module.exports = { Photo };
```

## 一对一关系
### 定义主实体 User
```js
// user.entity.js
const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
  name: 'User', // 实体名称
  tableName: 'users', // 数据库表名
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true // 自增主键
    },
    username: {
      type: 'varchar',
      length: 50,
      unique: true // 用户名唯一
    }
  },
  relations: {
    // 关联到 Profile，一对一关系
    profile: {
      type: 'one-to-one', // 关系类型：一对一
      target: 'Profile', // 关联的目标实体
      inverseSide: 'user', // 对应 Profile 中关联 User 的字段名
      cascade: true // 级联操作：保存 User 时自动保存关联的 Profile
    }
  }
});

module.exports = { User };
```
### 定义关联实体 Profile
```js
// profile.entity.js
const { EntitySchema } = require('typeorm');

const Profile = new EntitySchema({
  name: 'Profile', // 实体名称
  tableName: 'profiles', // 数据库表名
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true // 自增主键
    },
    bio: {
      type: 'text', // 个人简介
      nullable: true // 允许为空
    }
  },
  relations: {
    // 关联到 User，一对一关系
    user: {
      type: 'one-to-one', // 关系类型：一对一
      target: 'User', // 关联的目标实体
      inverseSide: 'profile', // 对应 User 中关联 Profile 的字段名
      joinColumn: true // 生成关联列
    }
  }
});

module.exports = { Profile };
```
### 使用方法
```js
const { DataSource } = require('typeorm');
const { User } = require('./user.entity');   // 引入 User 实体
const { Profile } = require('./profile.entity'); // 引入 Profile 实体

// 初始化数据库连接（和之前一致）
const dataSource = new DataSource({
  type: 'mysql',          // 换成你的数据库类型，如 postgres、sqlite 等
  host: 'localhost',     
  port: 3306,            
  username: 'your_user',  
  password: 'your_pass',  
  database: 'your_db',   
  entities: [User, Profile], 
  synchronize: true,     
  logging: true,         
});

// 1. 创建用户并关联资料（保持你原来的逻辑）
async function createUserWithProfile() {
  await dataSource.initialize();
  
  const profile = {
    bio: '热爱编程的开发者',
    avatar: 'https://example.com/avatar.jpg'
  };
  
  const user = {
    username: 'dev_user',
    profile: profile 
  };
  
  const savedUser = await dataSource.getRepository(User).save(user);
  console.log('创建成功：', savedUser);

  // 新增：调用查询函数，查看表格数据
  await showTableData();
}

// 2. 查询并打印 users、profiles 表的数据
async function showTableData() {
  try {
    // 查询 users 表数据（带关联的 profile）
    const userRepo = dataSource.getRepository(User);
    const users = await userRepo.find({
      relations: ['profile'], // 同时查关联的 profile
    });
    console.log('=== users 表数据 ===');
    console.table(users); // 用 console.table 格式化打印

    // 查询 profiles 表数据
    const profileRepo = dataSource.getRepository(Profile);
    const profiles = await profileRepo.find();
    console.log('=== profiles 表数据 ===');
    console.table(profiles);

  } catch (error) {
    console.error('查询表格数据失败：', error);
  } finally {
    await dataSource.destroy(); // 关闭连接
  }
}

// 执行创建流程
createUserWithProfile();
```

## 多对一 / 一对多关系实现
### 定义实体 User（一对多的一方）
```js
// user.entity.js
const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
  name: 'User', // 实体名称
  tableName: 'users', // 数据库表名
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true // 自增主键
    },
    username: {
      type: 'varchar',
      length: 50,
      unique: true // 用户名唯一
    }
  },
  relations: {
    // 一个用户拥有多个照片（一对多关系）
    photos: {
      type: 'one-to-many', // 关系类型：一对多
      target: 'Photo', // 关联的目标实体
      inverseSide: 'user', // 对应 Photo 中关联 User 的字段名
      cascade: true // 级联操作：保存 User 时自动保存关联的 Photo
    }
  }
});

module.exports = { User };
```
### 定义实体 Photo（多对一的一方）
```js
// photo.entity.js
const { EntitySchema } = require('typeorm');

const Photo = new EntitySchema({
  name: 'Photo', // 实体名称
  tableName: 'photos', // 数据库表名
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true // 自增主键
    },
    url: {
      type: 'varchar',
      length: 255, // 照片URL
    },
    description: {
      type: 'text',
      nullable: true // 照片描述，允许为空
    }
  },
  relations: {
    // 多个照片属于一个用户（多对一关系）
    user: {
      type: 'many-to-one', // 关系类型：多对一
      target: 'User', // 关联的目标实体
      inverseSide: 'photos', // 对应 User 中关联 Photo 的字段名
      joinColumn: true // 生成关联列（外键）
    }
  }
});

module.exports = { Photo };
```
### 数据库连接配置
```js
// data-source.js
const { User } = require('./user.entity')
const { Photo } = require('./photo.entity')
const { DataSource } = require('typeorm')
require('reflect-metadata')

// 数据库连接配置
const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'blog',
    entities: [User, Photo], // 包含相关实体
    synchronize: true,
    logging: false
})

module.exports = { AppDataSource }
```
### 使用方法
```js
// 操作示例
const { AppDataSource } = require('./data-source');
const { User } = require('./user.entity');
const { Photo } = require('./photo.entity');

// 初始化连接
async function initialize() {
  await AppDataSource.initialize();
  console.log('数据库连接已初始化');
}

// 创建用户及其照片
async function createUserWithPhotos() {
  await initialize();
  
  // 创建照片
  const photo1 = {
    url: 'https://example.com/photo1.jpg',
    description: '旅行照片'
  };
  
  const photo2 = {
    url: 'https://example.com/photo2.jpg',
    description: '生活照片'
  };
  
  // 创建用户并关联照片
  const user = {
    username: 'photo_user',
    photos: [photo1, photo2] // 一个用户关联多个照片
  };
  
  const savedUser = await AppDataSource.getRepository(User).save(user);
  console.log('创建成功：', savedUser);

  // 查询数据
  await queryUserData();
}

// 查询用户及其照片
async function queryUserData() {
  try {
    // 查询用户及其关联的照片
    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find({
      relations: ['photos'], // 同时查询关联的照片
    });
    console.log('=== 用户及其照片 ===');
    console.table(users);

    // 查询照片及其所属用户
    const photoRepo = AppDataSource.getRepository(Photo);
    const photos = await photoRepo.find({
      relations: ['user'], // 同时查询所属用户
    });
    console.log('=== 照片及其所属用户 ===');
    console.table(photos);

  } catch (error) {
    console.error('查询失败：', error);
  } finally {
    await AppDataSource.destroy();
  }
}

// 执行
createUserWithPhotos();
```
## 多对多关系实现
### 定义实体 Question

```js
// question.entity.js
const { EntitySchema } = require('typeorm');

const Question = new EntitySchema({
  name: 'Question', // 实体名称
  tableName: 'questions', // 数据库表名
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true // 自增主键
    },
    title: {
      type: 'varchar',
      length: 255, // 问题标题
    },
    content: {
      type: 'text', // 问题内容
    }
  },
  relations: {
    // 一个问题可以属于多个分类（多对多关系）
    categories: {
      type: 'many-to-many', // 关系类型：多对多
      target: 'Category', // 关联的目标实体
      inverseSide: 'questions', // 对应 Category 中关联 Question 的字段名
      joinTable: true, // 作为拥有方，生成中间表
      cascade: true // 级联操作
    }
  }
});

module.exports = { Question };

```
### 定义实体 Category
```js
// category.entity.js
const { EntitySchema } = require('typeorm');

const Category = new EntitySchema({
  name: 'Category', // 实体名称
  tableName: 'categories', // 数据库表名
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true // 自增主键
    },
    name: {
      type: 'varchar',
      length: 100,
      unique: true // 分类名称唯一
    },
    description: {
      type: 'text',
      nullable: true // 分类描述，允许为空
    }
  },
  relations: {
    // 一个分类可以包含多个问题（多对多关系）
    questions: {
      type: 'many-to-many', // 关系类型：多对多
      target: 'Question', // 关联的目标实体
      inverseSide: 'categories', // 对应 Question 中关联 Category 的字段名
      // 多对多关系中，另一方已设置 joinTable，这里不需要重复设置
    }
  }
});

module.exports = { Category };
```
### 数据库连接配置
```js
// data-source.js
const { Question } = require('./question.entity')
const { Category } = require('./category.entity')
const { DataSource } = require('typeorm')
require('reflect-metadata')

// 数据库连接配置
const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'blog',
    entities: [Question, Category], // 包含相关实体
    synchronize: true,
    logging: false
})

module.exports = { AppDataSource }
```
### 使用方法
```js
// 操作示例
const { AppDataSource } = require('./data-source');
const { Question } = require('./question.entity');
const { Category } = require('./category.entity');

// 初始化连接
async function initialize() {
  await AppDataSource.initialize();
  console.log('数据库连接已初始化');
}

// 创建问题及其分类
async function createQuestionsWithCategories() {
  await initialize();
  
  // 创建分类
  const category1 = {
    name: '前端开发',
    description: '涉及HTML/CSS/JavaScript等技术'
  };
  
  const category2 = {
    name: '编程基础',
    description: '编程语言入门知识'
  };
  
  const category3 = {
    name: '框架学习',
    description: '各类开发框架的使用与原理'
  };
  
  // 创建问题并关联分类（多对多）
  const question1 = {
    title: '什么是JavaScript？',
    content: '想了解JavaScript的基本概念和用途',
    categories: [category1, category2] // 一个问题属于多个分类
  };
  
  const question2 = {
    title: '如何学习React？',
    content: 'React入门有哪些推荐的学习资源',
    categories: [category1, category3] // 一个问题属于多个分类
  };
  
  // 保存数据
  const savedQuestions = await AppDataSource.getRepository(Question).save([question1, question2]);
  console.log('创建成功：', savedQuestions);

  // 查询数据
  await queryRelationshipData();
}

// 查询多对多关系数据
async function queryRelationshipData() {
  try {
    // 查询问题及其关联的分类
    const questionRepo = AppDataSource.getRepository(Question);
    const questions = await questionRepo.find({
      relations: ['categories'], // 同时查询关联的分类
    });
    console.log('=== 问题及其分类 ===');
    questions.forEach(question => {
      console.log(`问题: ${question.title}`);
      console.log('所属分类:', question.categories.map(c => c.name).join(', '));
    });

    // 查询分类及其包含的问题
    const categoryRepo = AppDataSource.getRepository(Category);
    const categories = await categoryRepo.find({
      relations: ['questions'], // 同时查询关联的问题
    });
    console.log('\n=== 分类及其包含的问题 ===');
    categories.forEach(category => {
      console.log(`分类: ${category.name}`);
      console.log('包含问题:', category.questions.map(q => q.title).join(', '));
    });

  } catch (error) {
    console.error('查询失败：', error);
  } finally {
    await AppDataSource.destroy();
  }
}

// 执行
createQuestionsWithCategories();

```