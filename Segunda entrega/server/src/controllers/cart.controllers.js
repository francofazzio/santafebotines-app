
import { CartDao } from "../daos/index.daos.js";


const getNewCart = async (req, res) => {
  try {
    const resultado = await CartDao.crearCarrito();
    res.send(resultado);
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error al querer crear un nuevo carrito",
      error
    );
    res.sendStatus(500);
  }
};
const deleteCart = async (req, res) => {
  try {
    let resultado = await CartDao.borrar(req.params.id);
    if (!resultado) {
      res.send("El id de carrito no existe");
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error al querer eliminar el carrito",
      error
    );
    res.sendStatus(500);
  }
};
const getCartProducts = async (req, res) => {
  try {
    let resultado = await CartDao.listarUno(req.params.id);
    res.send(resultado);
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error al querer obtener los productos del carrito",
      error
    );
    res.sendStatus(500);
  }
};
const postProductToCart = async (req, res) => {
  try {
   
    let resultado = await CartDao.guardarEnCarrito(req.params.id, req.body);
    res.send(resultado);
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error al querer agregar productos al carrito",
      error
    );
    res.sendStatus(500);
  }
};
const deleteProductFromCart = async (req, res) => {
  try {
    let resultado = await CartDao.borrarDelCarrito(
      req.params.id,
      req.params.id_prod
    );
    console.log("Resultado: ", resultado);
    res.sendStatus(200);
  } catch (error) {
    console.log(
      "Ocurrio el siguiente error al querer eliminar el producto del carrito",
      error
    );
    res.sendStatus(500);
  }
};

export {
  getNewCart,
  deleteCart,
  getCartProducts,
  postProductToCart,
  deleteProductFromCart,
};