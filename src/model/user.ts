import mongoose, { Schema, Document } from "mongoose";

// in this section we create one interface and defined as name with Message and extend it with documetn (its the part of typescript)
export interface Message extends Document {
    content: string;
    createdAt: Date
}

// this section id defined message Schima with mongiodb and typeScript 
// we create one Schima with name messageSchima and define schema type for type script
const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: [true, "Content is Required"]
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    messages: Message[]
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "user name is Required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        match: [/^[\w.-]+@[\w.-]+\.[\w]{2,4}$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    verifyCode: {
        type: String,
        required: [true, 'verify Code is Required']
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'verify code expiry is required'],
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [messageSchema]

})
// in this part of code we try to create modal or collection in mongodb 
//  mongoose.Model<User> in this section we define type of modal its part of typeScript
// (mongoose.models.User as mongoose.Model<User>) we check is model is define then dont need to create new modal 
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('user', userSchema);

export default UserModel;