import { MikroORM } from '@mikro-orm/core';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SqliteDriver } from '@mikro-orm/sqlite';

(async () => {
  const orm = await MikroORM.init({
    discovery: {
      // we need to disable validation for no entities
      warnWhenNoEntities: false,
    },
    extensions: [EntityGenerator],
    dbName: 'database.sqlite',
      driver: SqliteDriver,

    // ...
  });
  const dump = await orm.entityGenerator.generate({
    save: true,
    path: process.cwd() + '/my-entities',
  });
  console.log(dump);
  await orm.close(true);
})();