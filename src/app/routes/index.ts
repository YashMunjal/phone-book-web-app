import {Router} from 'express';
import { handleGetAllContacts, 
handleCreateContact,
handleGetContactByGet,
handleAddContact,
handleAddEmail,
} from '../controllers';

const router = Router();

// GET Routes
router.get('/contacts', handleGetAllContacts);
router.get('/contact/:id', handleGetContactByGet);


// POST Routes
router.post('/create-contact', handleCreateContact)
router.post('/add-contact', handleAddContact)
router.post('/add-email', handleAddEmail)

export default router;