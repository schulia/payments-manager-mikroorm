import { MikroORM } from '@mikro-orm/core';

let orm: MikroORM;

export const initializeORM = async (config: any) => {
  if (!orm) {
    orm = await MikroORM.init(config);
    // console.log(orm.em); // access EntityManager via `em` property
    console.log('schema initialized');
    // console.log(orm.schema);
  }
  return orm;
};

export const getORM = (): MikroORM => {
  if (!orm) {
    throw new Error('ORM not initialized. Call initializeORM first.');
  }
  return orm;
};