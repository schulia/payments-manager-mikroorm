import { Entity, ManyToOne, type Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from './Users';

@Entity()
export class Payouts {

  @PrimaryKey({ type: 'uuid', columnType: 'UUID', nullable: true })
  id?: string;

  @Property({ type: 'string' })
  currency: string & Opt = 'EUR';

  @Property({ type: 'decimal', columnType: 'DECIMAL(10,2)', defaultRaw: `0` })
  amount!: string & Opt;

  @Property({ fieldName: 'transactionId', type: 'uuid', columnType: 'UUID' })
  transactionId!: string;

  @ManyToOne({ entity: () => Users, fieldName: 'userId' })
  userId!: Users;

  @Property({ fieldName: 'createdAt' })
  createdAt!: Date;

  @Property({ fieldName: 'updatedAt' })
  updatedAt!: Date;

}
