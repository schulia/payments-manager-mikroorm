const { defineConfig } = require('@mikro-orm/sqlite');
const { TsMorphMetadataProvider } = require('@mikro-orm/reflection');

module.exports = defineConfig({
  dbName: 'sqlite.db',
  // entities: ['dist/**/*.entity.js'],
  entities: ['src/**/*.entity.ts'], // Source files are in src/
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
});