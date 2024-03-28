import mongoose, { Schema , Document } from "mongoose";

export interface ITodo extends Document{
    title: string,
    description: string,
    done: boolean,
}

const TodoSchema:Schema = new Schema({
    title:{
        type :  String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    done:{
        type: Boolean ,
        default: false
    }
},{
    timestamps:true,
    versionKey:false
})

export default mongoose.model<ITodo>('Todo',TodoSchema)

