const { defineConfig } = require('@mikro-orm/sqlite');
const { TsMorphMetadataProvider } = require('@mikro-orm/reflection');
import { SqliteDriver } from '@mikro-orm/sqlite';

export default defineConfig({
  dbName: 'database.sqlite',
    driver: SqliteDriver,
  // entities: ['dist/**/*.entity.js'],
  entities: ['src/**/*.entity.ts'], // Source files are in src/
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
});


 