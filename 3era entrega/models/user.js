import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: false },
  role: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

export default User;


import { Schema, model } from 'mongoose';

const UserSchema = new Schema({	
    name: {type: String, required: true,},
		email: {type: String,	required: true,	unique: true,},
		password: {type: String, required: true,},
		address: {type: String,required: true,},
		phone: {type: String,required: true,},
		age: {type: Number,required: true,},
		avatar: {type: String,required: true,},
		role: {type: String,default: 'user',},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const UserModel = mongoose.model('users', UserSchema);

export { UserModel };