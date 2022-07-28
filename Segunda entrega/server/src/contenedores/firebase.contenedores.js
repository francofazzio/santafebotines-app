
import dbConfigUtils from "../utils/dbConfig.utils.js";
import admin from "firebase-admin";

//INICIO FIREBASE
admin.initializeApp({
  credential: admin.credential.cert(dbConfigUtils.firebase),
});
const db = admin.firestore();


class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }

  async listarTodos() {
    const docs = await this.coleccion;
    const snapshot = await docs.get();
    let arrayProductos = [];
    snapshot.forEach((doc) => {
      let data = doc.data();
      let id = doc.id;
      arrayProductos.push({ ...data, id });
    });
    return arrayProductos;
  }

  async listarUno(id) {
    const doc = await this.coleccion.doc(id).get();
    const data = doc.data();
    return { ...data, id };
  }

  async guardar(elemento) {
    elemento.timestamp = new Date().toLocaleString("fr-FR");
    delete elemento.administrador;
    const newElement = this.coleccion.doc();
    await newElement.create(elemento);
    return;
  }

  async actualizar(id, elemento) {
    let resultado = "";
    resultado = await this.coleccion.doc(id).update(elemento);
    resultado = "OK";
    return resultado;
  }

  async borrar(id) {
    await this.coleccion.doc(id).delete();
    let resultado = "OK";
    return resultado;
  }

  async crearCarrito() {
    const nuevoCarrito = { timestamp: "", productos: [] };
    nuevoCarrito.timestamp = new Date().toLocaleString("fr-FR");
    let resultado = await this.coleccion.add(nuevoCarrito);
    return resultado.id;
  }

  async guardarEnCarrito(idCart, elemento) {
    await this.coleccion.doc(idCart).update({
      productos: admin.firestore.FieldValue.arrayUnion(elemento),
    });
    let resultado = "OK";
    return resultado;
  }

  async borrarDelCarrito(idCart, idProduct) {
    let resultado;
    await db.runTransaction(async (t) => {
      const doc = await t.get(this.coleccion.doc(idCart));
      let arrayProductos = [];
      arrayProductos = doc.data().productos;
      const indiceEncontrado = arrayProductos.findIndex((producto) => {
        return producto.id === idProduct;
      });
      if (indiceEncontrado >= 0) {
        arrayProductos.splice(indiceEncontrado, 1);
        t.update(this.coleccion.doc(idCart), { productos: arrayProductos });
        resultado = `Producto con ID ${idProduct}, eliminado correctamente del cart con ID ${idCart}`;
      } else {
        resultado = "El carrito es correcto pero el producto no existe";
      }
    });
    return resultado;
  }
}

export default ContenedorFirebase;