import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from './user.entity';

@Entity({ tableName: 'payouts' })
export class Payout {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property({ default: 'EUR' })
  currency: string = 'EUR';

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  amount: number = 0.00;

  @Property({ type: 'uuid' })
  @Unique()
  transactionId!: string;

  @ManyToOne(() => User)
  user!: User;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(transactionId: string, user: User, amount?: number, currency?: string) {
    this.transactionId = transactionId;
    this.user = user;
    if (amount !== undefined) this.amount = amount;
    if (currency !== undefined) this.currency = currency;
  }
}

