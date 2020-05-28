import { Model } from 'objection';
import { User } from './user.model';

export class Email extends Model {
  email?: string;
  
  userId?: string;

  static get tableName(){
    return 'emails'
  }

  static get idColumn() {
    return 'email';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          to: 'emails.user_id'
        }
      }
    }
  }
}