import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('contacts', (builder: Knex.CreateTableBuilder) => {
    builder.string('number', 11).primary().notNullable();
    builder.uuid('user_id').notNullable();

    builder.foreign('user_id').references('users.id');
  })
}


export async function down(knex: Knex): Promise<any> {
  await knex.raw('drop extension if exists "uuid-ossp"');
  await knex.schema.dropTable('contacts');
}

