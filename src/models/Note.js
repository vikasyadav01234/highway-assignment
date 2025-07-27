import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    note:{
        type:String,
        required:true
    }
},{timestamps:true})

const Note = mongoose.model("Note",NoteSchema);
export default Note;