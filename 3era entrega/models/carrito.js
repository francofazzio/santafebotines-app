import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
  user: { type: String, required: true },
  products: { type: Array, required: false },
},
  {
    timestamps: true,
    versionKey: false,
  }
);

const Carrito = mongoose.model("carrito", carritoSchema);

export default Carrito;