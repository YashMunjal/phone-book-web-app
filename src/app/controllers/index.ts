import {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import { 
  getAllUsers, 
  createUser, 
  UserObject, 
  insertNumber, 
  insertEmail, 
  getUserById ,
  contactExists

} from '../../services/user.service';

export async function handleGetAllContacts(req: Request, res: Response) {
  try {
    res.json(await getAllUsers());
  } catch (error) {
    console.log(error)
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
    if(contactExists(contactNumber)) return res.status(400).json({error: 'Contact already exsists'});
    const createdUser = await createUser(user);
    if(!createdUser) throw new Error;
    if(contactNumber) await insertNumber(createdUser, contactNumber);
    if(email) await insertEmail(createdUser, email);

    return res.status(200).json({user: await getUserById(createdUser.id)});
    

  } catch (error) {
    console.log(error)
  }
}