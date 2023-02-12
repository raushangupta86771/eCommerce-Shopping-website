import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        productId: {
            type: String
        },
        title: { type: String },
        quantity: { type: Number },
        price: { type: Number },
        image: { type: String },
        isPlaced:{type:Boolean},
        isShipped:{type:Boolean},
        isDelivered:{type:Boolean},
    },
    { timestamps: true } //it will add 2 fiels "created at" and "updated at" in database so no need for doing manually
)

const OrderModel = mongoose.model("Orders", OrderSchema);
export default OrderModel;
