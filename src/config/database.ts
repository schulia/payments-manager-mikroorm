import { MikroORM } from '@mikro-orm/core';
import config from '../../mikro-orm.config';

let orm: MikroORM;

export const initializeDatabase = async (): Promise<MikroORM> => {
  if (!orm) {
    orm = await MikroORM.init(config);
  }
  return orm;
};

export const getDatabase = (): MikroORM => {
  if (!orm) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return orm;
};

export const closeDatabase = async (): Promise<void> => {
  if (orm) {
    await orm.close();
  }
};