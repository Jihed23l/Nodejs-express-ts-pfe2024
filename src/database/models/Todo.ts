import mongoose, { Schema , Document ,PaginateModel} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

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
    },
    deletedAt:{
        type: Date,
        default: null
    }
},{
    timestamps:true,
    versionKey:false
})

TodoSchema.plugin(mongoosePaginate)

export default mongoose.model<ITodo,PaginateModel<ITodo>>('Todo',TodoSchema)

