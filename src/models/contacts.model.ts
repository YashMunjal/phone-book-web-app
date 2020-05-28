import { Model } from 'objection';
import { User } from './user.model';

export class Contacts extends Model {

  userId: string;
  number: string;

  constructor() {
    super();
    this.userId = '';
    this.number = '';
  }

  static get tableName() {
    return 'contacts';
  }

  static get idColumn() {
    return 'number';
  }

  static get relationMappings() {
    return {
      user : {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'contacts.user_id',
          to: 'users.id'
        }
      }
    }
  }
}