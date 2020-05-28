import { Model } from 'objection';
import { User } from './user.model';

export class Email extends Model {
  email?: string;
  
  userId?: string;

  static get tableName(){
    return 'emails'
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'email.user_id',
          to: 'users.id'
        }
      }
    }
  }
}