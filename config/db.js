import mongoose, { mongo } from "mongoose";
mongoose.connect(process.env.MONGODB_URL, {dbName : 'keepNotes'})