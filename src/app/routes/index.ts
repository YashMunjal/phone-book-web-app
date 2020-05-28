import {Router} from 'express';
import { handleGetAllContacts, 
handleCreateContact,
handleGetContactByGet,
handleAddContact,
handleAddEmail,
handleSearch,
} from '../controllers';

const router = Router();

// GET Routes
router.get('/contacts', handleGetAllContacts);
router.get('/contact/:id', handleGetContactByGet);
router.get('/search', handleSearch)


// POST Routes
router.post('/create-contact', handleCreateContact)
router.post('/add-contact', handleAddContact)
router.post('/add-email', handleAddEmail)

export default router;