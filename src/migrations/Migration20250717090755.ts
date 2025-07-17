import { Migration } from '@mikro-orm/migrations';

export class Migration20250717090755 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`users\` (\`id\` text not null, \`name\` text not null, \`email\` text not null, \`createdAt\` datetime not null, \`updatedAt\` datetime not null, primary key (\`id\`));`);
    this.addSql(`create unique index \`users_email_unique\` on \`users\` (\`email\`);`);

    this.addSql(`create table \`payouts\` (\`id\` text not null, \`currency\` text not null default 'EUR', \`amount\` numeric(10,2) not null default 0, \`transaction_id\` text not null, \`user_id\` text not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, constraint \`payouts_user_id_foreign\` foreign key(\`user_id\`) references \`users\`(\`id\`) on update cascade, primary key (\`id\`));`);
    this.addSql(`create unique index \`payouts_transaction_id_unique\` on \`payouts\` (\`transaction_id\`);`);
    this.addSql(`create index \`payouts_user_id_index\` on \`payouts\` (\`user_id\`);`);
  }

}
