import knex from 'knex';
import {config as dbConfig} from './config';

const env = process.env.NODE_ENV || 'development';

const config = env === 'development' ? dbConfig.development : dbConfig.production;

export default knex(config);