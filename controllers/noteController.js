import Note from "../models/noteModel.js";
import { verifyUserToken } from "../config/firebase.js";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.SECRET_KEY);

// GET /api/getnotes
const getNotes = async (req, res) => {
    try {
        const user = await verifyUserToken(req.headers.authorization.split(" ")[1]);
        let notes = await Note.find({ userId: user.uid});
        
        if (!Array.isArray(notes)) {
            notes = [notes];
        }

        notes = notes.map((note) => {
            const _id = note._id;
            const title = cryptr.decrypt(note.title);
            const content = cryptr.decrypt(note.content);
            return { _id, title, content };
        });
        
        res.status(200).json(notes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// POST /api/createnote
const createNote = async (req, res) => {
    try {
        const title = cryptr.encrypt(req.body.title);
        const content = cryptr.encrypt(req.body.content);
        const user = await verifyUserToken(req.headers.authorization.split(" ")[1]);
        const newNote = new Note({
            title,
            content,
            userId: user.uid
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
}

// DELETE /api/deletenote/:id
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await verifyUserToken(req.headers.authorization.split(" ")[1]);
        await Note.deleteOne({ _id: id, userId: user.uid });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// PUT /api/updatenote/:id
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const title = cryptr.encrypt(req.body.title);
        const content = cryptr.encrypt(req.body.content);
        const user = await verifyUserToken(req.headers.authorization.split(" ")[1]);
        await Note.findOneAndUpdate({ _id: id, userId: user.uid }, { title, content });
        res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}

export {
    getNotes,
    createNote,
    deleteNote,
    updateNote
}

