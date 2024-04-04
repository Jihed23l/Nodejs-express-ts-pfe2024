import mongoose, { Schema , Document ,PaginateModel} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

export interface IUser extends Document{
    username:string,
    email:string,
    password:string,
    profilePictureUrl?: string; 
}


const UserSchema : Schema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    profilePictureUrl:{
        type: String
    }
})
 
UserSchema.plugin(mongoosePaginate)

export default mongoose.model<IUser,PaginateModel<IUser>>('User',UserSchema)
