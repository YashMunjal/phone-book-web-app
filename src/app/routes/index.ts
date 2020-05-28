import {Router} from 'express';
import { handleGetAllContacts, handleCreateContact, handleGetContactByGet } from '../controllers';

const router = Router();

// GET Routes
router.get('/contacts', handleGetAllContacts);
router.get('/contact/:id', handleGetContactByGet);


// POST Routes
router.post('/create-contact', handleCreateContact)

export default router;