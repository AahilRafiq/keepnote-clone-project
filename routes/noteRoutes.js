import express from 'express';
import {getNotes,createNote , deleteNote , updateNote} from '../controllers/noteController.js';

const router = express.Router();

router.get('/getnotes',getNotes);
router.post('/createnote',createNote);
router.put('/updatenote/:id',updateNote);
router.delete('/deletenote/:id',deleteNote);

export default router;