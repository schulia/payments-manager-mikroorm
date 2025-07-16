"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payout = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const user_entity_1 = require("./user.entity");
let Payout = class Payout {
    constructor(transactionId, user, amount, currency) {
        this.id = (0, uuid_1.v4)();
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
exports.Payout = Payout;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' })
], Payout.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ default: 'EUR' })
], Payout.prototype, "currency", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
], Payout.prototype, "amount", void 0);
__decorate([
    (0, core_1.Property)({ type: 'uuid' }),
    (0, core_1.Unique)()
], Payout.prototype, "transactionId", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User)
], Payout.prototype, "user", void 0);
__decorate([
    (0, core_1.Property)({ onCreate: () => new Date() })
], Payout.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ onCreate: () => new Date(), onUpdate: () => new Date() })
], Payout.prototype, "updatedAt", void 0);
exports.Payout = Payout = __decorate([
    (0, core_1.Entity)({ tableName: 'payouts' })
], Payout);
