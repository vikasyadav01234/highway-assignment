import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

const Note = mongoose.models.Note || mongoose.model("Note",NoteSchema);
export default Note;