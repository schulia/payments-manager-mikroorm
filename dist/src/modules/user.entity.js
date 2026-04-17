var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
let User = class User {
    // @OneToMany(() => OcpiTokens, token => token.user)
    // tokens = new Collection<OcpiTokens>(this);
    constructor(name, email) {
        this.id = v4();
        this.created_at = new Date();
        this.updated_at = new Date();
        this.name = name;
        this.email = email;
    }
};
__decorate([
    PrimaryKey({ type: 'uuid' })
], User.prototype, "id", void 0);
__decorate([
    Property()
], User.prototype, "name", void 0);
__decorate([
    Property(),
    Unique()
], User.prototype, "email", void 0);
__decorate([
    Property({ fieldName: 'createdAt', onCreate: () => new Date() })
], User.prototype, "created_at", void 0);
__decorate([
    Property({ fieldName: 'updatedAt', onCreate: () => new Date(), onUpdate: () => new Date() })
], User.prototype, "updated_at", void 0);
User = __decorate([
    Entity({ tableName: 'users' })
], User);
export { User };
