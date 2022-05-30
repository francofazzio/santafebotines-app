class Userapp {
    constructor (nombre, apellido){
        this.nombre = nombre
        this.apellido = apellido 
        this.libros = []
        this.mascotas = []
    }
    getFullName (){
        return `${this.nombre} ${this.apellido}`
    }
    addMascotas(masc){
        this.mascotas.push(masc)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(libro , aut){
        this.libros.push({nombre: libro , autor: aut})
    }
    getBookNames(){
        const listaLibros = []
        this.libros.map(n=>listaLibros.push(n.nombre))
        return listaLibros
    }
}
const franco = new Userapp("franco", "fazzio")
console.log(franco.getFullName())
franco.addMascotas("ciro")
console.log(franco.countMascotas())
franco.addBook("El futbol a sol y sombra", "Eduardo Galeano")
franco.addBook("Gallardo recargado", "Diego Borinsky")
console.log(franco.getBookNames())
