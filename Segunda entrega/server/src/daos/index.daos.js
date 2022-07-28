
import dotenv from "dotenv";
dotenv.config();

let ProductDao;
let CartDao;


switch (process.env.DATABASE) {
  case "mongo":
    const { default: ProductDaoMongo } = await import(
      "./productos/mongo.productos.daos.js"
    );
    const { default: CartDaoMongo } = await import(
      "./carritos/mongo.carritos.daos.js"
    );
    ProductDao = new ProductDaoMongo();
    CartDao = new CartDaoMongo();
    break;
  case "firebase":
    const { default: ProductDaoFirebase } = await import(
      "./productos/firebase.productos.daos.js"
    );
    const { default: CartDaoFirebase } = await import(
      "./carritos/firebase.carritos.daos.js"
    );
    ProductDao = new ProductDaoFirebase();
    CartDao = new CartDaoFirebase();
    break;
}

export { ProductDao, CartDao };