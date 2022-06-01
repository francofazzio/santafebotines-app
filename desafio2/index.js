const fs = require("fs");

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }
    async save(objeto) {
        try {
            let ids =Array.from(JSON.parse(await fs.promises.readFile("./ids.txt","utf-8")));
            ids.push(ids[ids.length-1]+1);
            objeto.id = ids[ids.length-1];
            fs.promises.writeFile("./ids.txt", JSON.stringify(ids));
            let arrayObjetos = JSON.parse(await fs.promises.readFile(this.archivo,"utf8"));
            arrayObjetos.push(objeto);
            await fs.promises.writeFile(this.archivo, JSON.stringify(arrayObjetos))
            console.log("Objeto guardado en", this.archivo);
        }
        catch (error) {
            if(error.code === 'ENDENT') {
                objeto.id = 1;
                await fs.promises.writeFile("./ids.txt", JSON.stringify([1]));
                await fs.promises.writeFile(this.archivo, JSON.stringify([objeto]));
                console.log("Error guardando objeto en el fs.Code:",error);
            }
        }
    }
    async getById(id) {
        try {
            const data = JSON.parse(awai fs.promises.readFile(this.archivo, "utf8"));
            const objeto = data.find(objeto => objeto.id === id);
            return (objeto ? console.log(objeto) : console.log("No se encontro el objeto con el id", id));

        }
        catch (error) {
            console.log("Error buscando en el fs.code",error);

        }}

        async deleteAll() {
            try {
                await fs.promises.writeFile(this.archivo,"")
                console.log("Objetos eliminados")
            } catch(error) {
                console.log("Error eliminando objetos en el fs. code:", error)

            }
        }
    

    }
    const productos = [{
            title:"productos1",
            price: 200,
            thumbnail: "url1"
        },{
            title:"productos2",
            price: 300,
            thumbnail: "url2"
        },{
            title:"productos3",
            price: 400,
            thumbnail: "url4"
        }]
        const archivo = new Contenedor("./productos,txt")