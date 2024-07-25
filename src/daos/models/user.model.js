import mongoosePaginate from 'mongoose-paginate-v2';
import { Schema, model } from "mongoose";


const userSchema = new Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  age: { type: Number, require: true },
  password: { type: String, require: true },
  cart: {},
  role: {type: String, default: 'user'},
});


userSchema.plugin(mongoosePaginate);

export const UserModel = model("users", userSchema);