import { Migration } from '@mikro-orm/migrations';

export class Migration20250717090817 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`drop index \`payouts_user_id_index\`;`);
    this.addSql(`alter table \`payouts\` drop column \`user_id\`;`);
  }

}
