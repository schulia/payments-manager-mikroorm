"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { defineConfig } = require('@mikro-orm/sqlite');
const { TsMorphMetadataProvider } = require('@mikro-orm/reflection');
const sqlite_1 = require("@mikro-orm/sqlite");
exports.default = defineConfig({
    dbName: 'sqlite.db',
    driver: sqlite_1.SqliteDriver,
    // entities: ['dist/**/*.entity.js'],
    entities: ['src/**/*.entity.ts'], // Source files are in src/
    metadataProvider: TsMorphMetadataProvider,
    debug: true,
});
