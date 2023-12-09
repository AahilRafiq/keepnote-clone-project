import express from 'express';
import mongoose, { mongo } from "mongoose";
import cors from 'cors';
import 'dotenv/config';
import noteRoutes from './routes/noteRoutes.js';
import {verifyUserToken} from './config/firebase.js';
const port = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors(
    {
        origin: 'https://keepnote-clone.netlify.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
));
mongoose.connect(process.env.MONGODB_URI, {dbName : 'keepNotes'})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.log(error.message);
})

// Routes
app.use('/api',noteRoutes);

app.listen(port , () => {
    console.log(`Server running on port ${port}`);
});

/*

    {
        origin: 'https://keepnote-clone.netlify.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
*/ 