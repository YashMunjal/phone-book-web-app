import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';

export class User extends Model {

  id: string;

  firstName: string;

  lastName?: string;

  createdAt?: Date;

  constructor(){
    super();
    this.id = uuidv4();
    this.firstName = '';
  }

  $beforeInsert() {
    this.createdAt = new Date();
    if(!this.id) this.id = uuidv4();
  }

  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

}