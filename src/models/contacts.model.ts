import { Model } from 'objection';
import { User } from './user.model';

export class Contacts extends Model {

  userId?: string;
  contactNumber?: string;

  static get tableName() {
    return 'contacts';
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