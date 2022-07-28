
import ContenedorFirebase from "../../contenedores/firebase.contenedores.js";


class CartDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("compras");
  }
}

export default CartDaoFirebase;