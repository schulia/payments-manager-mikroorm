import { defineConfig } from '@mikro-orm/sqlite';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { EntityGenerator } from '@mikro-orm/entity-generator';

export default defineConfig({
  dbName: 'database.sqlite',
  driver: SqliteDriver,
  entities: ['./dist/src/modules/*.entity.js'],
  discovery: {
    warnWhenNoEntities: false,
    requireEntitiesArray: false,
    alwaysAnalyseProperties: false,
  },
  extensions: [EntityGenerator],
  debug: true,
});
