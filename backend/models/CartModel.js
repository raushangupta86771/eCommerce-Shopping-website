import mongoose from "mongoose";

const CartSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title:{type: String},
        productId: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
        image: { type: String }
    },
    { timestamps: true } //it will add 2 fiels "created at" and "updated at" in database so no need for doing manually
)

const CartModel = mongoose.model("Carts", CartSchema);
export default CartModel;
