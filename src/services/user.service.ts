import { raw } from 'objection';
import { User } from '../models/user.model';
import { Contacts } from '../models/contacts.model';
import { Email } from '../models/email.model';
import logger from './logger';

export interface UserObject {
  id: string;
  firstName: string;
  lastName?: string;
}

export async function createUser(user: UserObject) {
  try{
    if(!user) return logger.error('User missing');
    const createdUser = await User.query().insert(user);
    return {
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName
    };
  }
  catch(err){
    logger.error(err);
  }
}

export async function insertNumber(user: UserObject, number: string) {
  try{
    await Contacts.query().insert({
      userId: user.id,
      number: number,
    });
    const updatedUser = {
      ...user,
      contacts: await Contacts.query().where('userId', user.id)
    }

    return updatedUser
  }
  catch(err){
    logger.error(err);
  }
}

export async function insertEmail(user: UserObject, email: string) {
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
    logger.error(err);
  }
} 

export async function getAllUsers() {
  try {
      return await User.query().orderBy('firstName')
  } catch (err) {
    logger.error(err);
  }
}

export async function getUserById(id: string) {
  try {
    const user =  await User.query().findById(id);
    return {
      ...user,
      contacts: await Contacts.query().where('userId', user.id),
      emails: await Email.query().where('userId', user.id),
    }
  } catch (err) {
    logger.error(err);
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await Email.query().where('email', email).withGraphJoined('user');
  } catch (err) {
    logger.error(err);
  }
}

export async function getUserByContact(number: string) {
  try {
    return await Contacts.query().where('contactNumber', number).eager('user');
  } catch (err) {
    logger.error(err);
  }
}

export async function findUserByName(pattern: string) {
  try { 
    return await User.query().where(builder => {
      builder
      .where(raw('first_name ~ ?', pattern ))
      .orWhere(raw('last_name ~ ?', pattern ))
    });
  } catch (err) {
    logger.error(err);
  }
}

export async function findUserByContact(pattern: string) {
  try { 
    return await Contacts.query().where(raw('number ~ ?', pattern)).withGraphJoined('user');
  } catch (err) {
    logger.error(err);
  }
}

export async function contactExists(number: string) {
  try {
    const contacts = (await Contacts.query().where('number', number)).length;
    if(contacts === 0) return false;
    return true;
  } catch (error) {
    logger.error(error);
  }
}