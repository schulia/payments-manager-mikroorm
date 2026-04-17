var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from './user.entity.js';
let Payout = class Payout {
    constructor(transactionId, user, amount, currency) {
        this.id = v4();
        this.currency = 'EUR';
        this.amount = 0.00;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.transactionId = transactionId;
        this.user = user;
        if (amount !== undefined)
            this.amount = amount;
        if (currency !== undefined)
            this.currency = currency;
    }
};
__decorate([
    PrimaryKey({ type: 'uuid' })
], Payout.prototype, "id", void 0);
__decorate([
    Property({ default: 'EUR' })
], Payout.prototype, "currency", void 0);
__decorate([
    Property({ type: 'character', columnType: 'CHARACTER VARYING', nullable: true })
], Payout.prototype, "description", void 0);
__decorate([
    Property({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
], Payout.prototype, "amount", void 0);
__decorate([
    Property({ type: 'uuid', fieldName: 'transactionId' }),
    Unique()
], Payout.prototype, "transactionId", void 0);
__decorate([
    ManyToOne(() => User)
], Payout.prototype, "user", void 0);
__decorate([
    Property({ onCreate: () => new Date(), fieldName: 'createdAt' })
], Payout.prototype, "createdAt", void 0);
__decorate([
    Property({ onCreate: () => new Date(), onUpdate: () => new Date(), fieldName: 'updatedAt' })
], Payout.prototype, "updatedAt", void 0);
Payout = __decorate([
    Entity({ tableName: 'payouts' })
], Payout);
export { Payout };
