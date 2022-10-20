import { fork } from "child_process"

const randomsController = async(req, res) => {
    const calculo = fork("./src/utils/childRandom.js")

    let cant = req.query.cant
    if(isNaN(cant)){
        cant = 500000000
    }

    
    calculo.on('message', msg =>{
        if(msg === "ready"){
            calculo.send(cant)
        } else {
            console.log("--------FINALIZO EL HIJO---------")
            res.send(msg)
        }
    })
}

export { randomsController }