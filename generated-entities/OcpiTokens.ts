import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class OcpiTokens {

  @Property()
  id!: number;

  @Property({ type: 'smallint', columnType: 'SMALLINT', nullable: true })
  valid?: number;

  @Property({ type: 'character', columnType: 'CHARACTER VARYING', nullable: true })
  language?: string;

  @Property({ type: 'character', columnType: 'CHARACTER VARYING' })
  whitelist!: string;

  @Property({ type: 'character', columnType: 'CHARACTER VARYING' })
  issuer!: string;

  @Property({ type: 'character', columnType: 'CHARACTER VARYING', nullable: true })
  visualNumber?: string;

  @Property({ type: 'character', columnType: 'CHARACTER VARYING' })
  authId!: string;

  @Property({ type: 'character', columnType: 'CHARACTER VARYING' })
  type!: string;

  @Property({ type: 'character', columnType: 'CHARACTER VARYING' })
  ocppUid!: string;

  @Property({ type: 'character', columnType: 'CHARACTER VARYING', nullable: true })
  uid?: string;

  @Property()
  ocpiclientid!: bigint;

  @Property({ columnType: 'TIMESTAMP WITHOUT TIME ZONE', nullable: true })
  updatedat?: Date;

  @Property({ columnType: 'TIMESTAMP WITHOUT TIME ZONE', nullable: true })
  createdat?: Date;

  @Property({ columnType: 'TIMESTAMP WITHOUT TIME ZONE' })
  lastUpdated!: Date;

  @Property({ type: 'character', columnType: 'CHARACTER VARYING' })
  authMember!: string;

}
