// Update with your config settings.
import { knexSnakeCaseMappers } from 'objection';

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/phone_book',
    ...knexSnakeCaseMappers(),
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ...knexSnakeCaseMappers(),
  },
 

};
