import {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import { 
  getAllUsers, 
  createUser, 
  UserObject, 
  insertNumber, 
  insertEmail, 
  getUserById ,
  contactExists,
  findUserByContact,
  findUserByName,
  getUserByEmail,
} from '../../services/user.service';
import logger from '../../services/logger';

export async function handleGetAllContacts(req: Request, res: Response) {
  try {
    res.json(await getAllUsers());
  } catch (error) {
    logger.error(error)
  }
}

export async function handleCreateContact(req: Request, res: Response) {
  try {
    if(!req.body) return res.status(400).json({error: 'Body Missing'});

    const {firstName, lastName, email, contactNumber} = req.body;

    const user: UserObject =  {
      id: uuidv4(),
      firstName,
      lastName,
    }
    if(await contactExists(contactNumber)) return res.status(400).json({error: 'Contact already exsists'});
    const createdUser = await createUser(user);
    if(!createdUser) throw new Error;
    if(contactNumber) await insertNumber(createdUser, contactNumber);
    if(email) await insertEmail(createdUser, email);

    return res.status(200).json({user: await getUserById(createdUser.id)});
    

  } catch (error) {
    logger.error(error)
  }
}

export async function handleGetContactByGet(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if(!id) return res.status(400).json({error: 'Invalid ID'});
    const user = await getUserById(id);
    if(!user) res.status(404).json({error: 'Invalid ID'});
    return res.status(200).json(user);
  } catch (error) {
    logger.error(error)
  }
}

export async function handleAddContact(req: Request, res: Response){
  try {
    const {userId, contactNumber} = req.body;
    if(!userId || !contactNumber) return res.status(400).json({error: 'Invalid ID'});
    const user = await getUserById(userId);
    if(!user) return res.status(400).json({error: 'Invalid ID'});
    const userObj: UserObject = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id
    }
    const updatedUser = await insertNumber(userObj, contactNumber);

    return res.status(200).json({user: updatedUser});


  } catch (error) {
    logger.error(error)
  }
}

export async function handleAddEmail(req: Request, res: Response){
  try {
    const {userId, email} = req.body;
    if(!userId || !email) return res.status(400).json({error: 'Invalid ID'});
    const user = await getUserById(userId);
    if(!user) return res.status(400).json({error: 'Invalid ID'});
    const userObj: UserObject = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id
    }
    const updatedUser = await insertEmail(userObj, email);

    return res.status(200).json({user: updatedUser});

    
  } catch (error) {
    logger.error(error)
  }
}

export async function handleSearch(req: Request, res: Response) {
  try {
    const { email, firstName, lastName, contact } = req.query;

    const searchResults = [];

    if (contact &&  typeof contact === 'string') searchResults.push(await findUserByContact(contact));
    else if(email && typeof email === 'string') searchResults.push(await getUserByEmail(email))
    else if (firstName || lastName) {
      if(typeof firstName === 'string') searchResults.push(await findUserByName(firstName));
      if(typeof lastName === 'string') searchResults.push(await findUserByName(lastName))
    }
    
    return res.json({results: searchResults})


  } catch (error) {
    logger.error(error)
  }
}