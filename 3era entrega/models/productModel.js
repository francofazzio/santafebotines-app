import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true, },
  image: { type: String, required: true, }
},
  {
    timestamps: true,
    versionKey: false,
  });

const Product = mongoose.model("product", productSchema);

export default Product;