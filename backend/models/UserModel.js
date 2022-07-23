import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true } //it will add 2 fiels "created at" and "updated at" in database so no need for doing manually
)

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
