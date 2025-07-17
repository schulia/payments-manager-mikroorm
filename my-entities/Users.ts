import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Users {

  @PrimaryKey({ type: 'uuid', columnType: 'UUID', nullable: true })
  id?: string;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property({ fieldName: 'createdAt' })
  createdAt!: Date;

  @Property({ fieldName: 'updatedAt' })
  updatedAt!: Date;

}
