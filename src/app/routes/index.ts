import {Router} from 'express';
import { handleGetAllContacts, handleCreateContact } from '../controllers';

const router = Router();

// GET Routes
router.get('/contacts', handleGetAllContacts);


// POST Routes
router.post('/create-contact', handleCreateContact)

export default router;