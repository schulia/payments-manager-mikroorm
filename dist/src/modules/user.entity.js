"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
let User = class User {
    constructor(name, email) {
        this.id = (0, uuid_1.v4)();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.name = name;
        this.email = email;
    }
};
exports.User = User;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' })
], User.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)()
], User.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)(),
    (0, core_1.Unique)()
], User.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ onCreate: () => new Date() })
], User.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ onCreate: () => new Date(), onUpdate: () => new Date() })
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, core_1.Entity)({ tableName: 'users' })
], User);
