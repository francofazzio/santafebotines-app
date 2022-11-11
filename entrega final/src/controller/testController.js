import { faker } from "@faker-js/faker"

const randomProductsFaker = []

for (let i = 1; i <= 5; i++){
    randomProductsFaker.push({
        id: faker.random.numeric(),
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.avatar()
    })
}

const productsTest = async (req, res) => {

    res.render('plantillaTest.ejs', { randomProductsFaker })
}

export { productsTest }