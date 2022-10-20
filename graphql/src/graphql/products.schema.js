import { buildSchema } from "graphql";


const productSchema = buildSchema(`
    input ProductInput {
        title: String,
        description: String,
        code: String,
        thumbnail: String,
        price: Int,
        stock: Int,
    }
    type Product {
        id: ID!,
        title: String,
        description: String,
        code: String,
        thumbnail: String,
        price: Int,
        stock: Int,
    }
    type Query {
        getProduct(id: ID!): Product
        getProducts(campo: String, valor: String): [Product],
    }
    type Mutation {
        createProduct(datos: ProductInput): Product,
    }
`)

export { productSchema }