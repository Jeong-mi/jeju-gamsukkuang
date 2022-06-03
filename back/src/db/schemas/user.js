import pkg from "mongoose";
const { Schema, model } = pkg;

const UserSchema = new Schema(
	{
		id: {
			type: String,
			unique: true,
			required: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		nickname: {
			type: String,
			required: true,
			unique: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export const User = model("User", UserSchema);