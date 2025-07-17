const { defineConfig } = require('@mikro-orm/sqlite');
const { TsMorphMetadataProvider } = require('@mikro-orm/reflection');
import { SqliteDriver } from '@mikro-orm/sqlite';
import { EntityGenerator } from '@mikro-orm/entity-generator';

export default defineConfig({
  dbName: 'database.sqlite',
  driver: SqliteDriver,
  // entities: ['dist/**/*.entity.js'],
  entities: ['src/**/*.entity.ts'], // Source files are in src/
  metadataProvider: TsMorphMetadataProvider,
    extensions: [EntityGenerator],
  debug: true,
});


 