import { MikroORM } from '@mikro-orm/core';

let orm: MikroORM;

export const initializeORM = async (config: any) => {
  if (!orm) {
    orm = await MikroORM.init(config);
    // console.log(orm.em); // access EntityManager via `em` property
    const tables = await orm.em.getConnection().execute('SELECT name FROM sqlite_master WHERE type="table"');
    console.log('Tables:', tables); 
    console.log('schema initialized');
    console.log(orm.em);
  }
  return orm;
};

export const getORM = (): MikroORM => {
  if (!orm) {
    throw new Error('ORM not initialized. Call initializeORM first.');
  }
  return orm;
};