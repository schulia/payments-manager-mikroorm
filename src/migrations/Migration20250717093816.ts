import { Migration } from '@mikro-orm/migrations';

export class Migration20250717093816 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`ocpi_tokens\` add column \`auth_member\` CHARACTER VARYING not null;`);
  }

}
