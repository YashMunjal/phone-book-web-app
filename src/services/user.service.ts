import { User } from '../models/user.model';
import { Contacts } from '../models/contacts.model';
import { Email } from '../models/email.model';

export async function createContact(user: User): Promise<User | Error> {
  try{
    if(!user) return new Error('User missing');

    const createdUser = await User.query().insert(user);
    return createdUser;
  }
  catch(err){
    return new Error(err);
  }
}

export async function insertNumber(user: User, number: string) {
  try{
    await Contacts.query().insert({
      userId: user.id,
      contactNumber: number,
    });
    const updatedUser = {
      ...user,
      contacts: await Contacts.query().where('userId', user.id)
    }

    return updatedUser
  }
  catch(err){
    return new Error(err);
  }
}

export async function insertEmail(user: User, email: string) {
  try {
    await Email.query().insert({
      userId: user.id,
      email: email
    })

    const updatedUser = {
      ...user,
      contacts: await Contacts.query().where('userId', user.id),
      emails: await Email.query().where('userId', user.id),
    }

    return updatedUser;

  } catch (err) {
    return new Error(err);
  }
} 

export async function getAllUsers() {
  try {
      return await User.query()
  } catch (err) {
    return new Error(err);
  }
}

export async function getUserById(id: string) {
  try {
    return await User.query().findById(id);
  } catch (err) {
    return new Error(err);
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await Email.query().where('email', email).withGraphFetched('user');
  } catch (err) {
    return new Error(err);
  }
}