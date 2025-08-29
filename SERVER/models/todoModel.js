import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    todo : {
        type : String,
        required : true,
        unique : true,
        maxlength : 100
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }

},{timestamps : true});


const todos = mongoose.model("todos",todoSchema);

export default todos;