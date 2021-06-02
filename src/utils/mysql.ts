import { join } from 'path';
export default {
  type: 'mysql',
  host: '47.104.64.204',
  port: 3306,
  username: 'qdwds',
  password: 'SHGmhCZSk4wF5jAz',
  database: 'qdwds', //  数据库名
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],  //  实体位置
  synchronize: true,  //  同步
  maxQueryExecutionTime: 2000, // 查询最大时间
  // entityPrefix:"test_", //  给所有的表加前缀
};