import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('emails', (builder: Knex.CreateTableBuilder) => {
    builder.string('email', 50).notNullable();
    builder.uuid('user_id').notNullable()

    builder.foreign('user_id').references('users.id')
  })
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('emails')
}

