import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  name!: string;

  @Property()
  @Unique()
  email!: string;

  @Property({ fieldName: 'createdAt' , onCreate: () => new Date() })
  created_at: Date = new Date();

  @Property({ fieldName: 'updatedAt', onCreate: () => new Date(), onUpdate: () => new Date() })
  updated_at: Date = new Date();

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

