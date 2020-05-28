import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.schema.createTable('users', (builder: Knex.CreateTableBuilder)  => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    builder.string('first_name', 25).notNullable();
    builder.string('last_name', 25).notNullable();
    builder.dateTime('created_at');

  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw('drop extension if exists "uuid-ossp"');
  await knex.schema.dropTable('contacts');
}

