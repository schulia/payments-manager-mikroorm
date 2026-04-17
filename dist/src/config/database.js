import { MikroORM } from '@mikro-orm/core';
import config from '../../mikro-orm.config.js';
let orm;
export const initializeDatabase = async () => {
    if (!orm) {
        orm = await MikroORM.init(config);
    }
    return orm;
};
export const getDatabase = () => {
    if (!orm) {
        throw new Error('Database not initialized. Call initializeDatabase first.');
    }
    return orm;
};
export const closeDatabase = async () => {
    if (orm) {
        await orm.close();
    }
};
