import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
    {
        title: {
            type: String
        },
        price: {
            type: Number
        },
        desc: {
            type: String
        },
        image: {
            type: String
        }
    },
    { timestamps: true } //it will add 2 fiels "created at" and "updated at" in database so no need for doing manually
)

const ProductModel = mongoose.model("Products", ProductSchema);
export default ProductModel;
