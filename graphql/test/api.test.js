import supertest from "supertest";
import { expect } from "chai";
import { response } from "express";
import { mokecdProducts } from "../src/utils/mockedProducts.js";


let request;
let cookies;
let products;

const userForLoginTest = {
    username: 'luks',
    password: '1234'
}
const productToCreteTest = {
    title: "producto test mocha",
    description: "descripcion producto test mocha",
    code: "codigo test mocha",
    thumbnail: 'mocha image test',
    price: 1,
    stock:1
}

const getCookies = (headers) => {
    let cookies = headers["set-cookie"][0];
    cookies = cookies.split(";")[0];
    return cookies;
}

describe('Test over my API RESTFULL', () => {
    before(() => {
        request = supertest("http://localhost:8080")
    })

    //test login
    describe("- POST /api/user/login", () => {
        it("Should return status 200", async () =>{
            const response = await request.post("/api/user/login").send(userForLoginTest)
            cookies = getCookies(response.headers)

            expect(response.status).to.eql(200)
        })
    })

    //test get all products
    describe("- GET /api/products/all", () => {
        it("Should return status 200", async () =>{
            const response = await request.get("/api/products/all").set({ cookie: cookies })
            
            products = response.body
            expect(response.status).to.eql(200)
        })
        
        it("Sould response an array of objects", async () => {
            expect(products).to.be.an('array')
            expect(products).to.include.deep.members(mokecdProducts)
        })
    })

    //test post product
    describe("- POST /api/products/", () => {
        it("Should return status 201", async () => {
            const newProduct = await request.post("/api/products/").set({ cookie: cookies }).send(productToCreteTest)

            expect(newProduct.status).to.eql(201)
        })
    })

    //test unknown route
    describe("- GET Unknown", () => {
        it("Should return 404", async () => {
          const response = await request.get("/asdasd");
    
          expect(response.status).to.eql(404);
        });
      });
})