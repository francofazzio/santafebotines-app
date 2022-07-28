import React, { useEffect, useState } from "react";
//Estilos
import "./DinamicTable.css";

function DinamicTable() {
  
  const [arrayProductos, setArrayProductos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [direccion, setDireccion] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/productos", {
        method: "get",
      });
      if (!response.ok) {
        throw new Error(
          `Error en GET: Status ${response.status} - ${response.statusText}`
        );
      }
      let data = await response.json();
      setArrayProductos(data);
    } catch (error) {
      console.log("Error en el fecth: ", error);
    }
  };
  const postData = async (productInfo) => {
    try {
      const response = await fetch("http://localhost:3001/api/productos", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productInfo), //este ya es un object, por eso no necesita estar entre llaves
      });
      if (!response.ok) {
        throw new Error(
          `Error en POST: ${response.status} - ${response.statusText}`
        );
      } else {
        console.log("POST de producto correcto. Detalles: ", response);
      }
    } catch (error) {
      console.log("Error en el fetch: ", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const productInfo = {
      nombre: name,
      description: description,
      codigo: code,
      url: direccion,
      price: price,
      stock: stock,
    };
    postData(productInfo);
    setName("");
    setDescription("");
    setCode("");
    setDireccion("");
    setPrice(0);
    setStock(0);
    getData();
  };
  
  return (
    <>
      <section className="sect">
        <h3>
          Agregar productos por formulario usando un POST a /api/productos
        </h3>
        <div className="row">
          <div className="col-1"></div>
          <form
            id="productForm"
            autoComplete="off"
            className="col-10"
            onSubmit={handleSubmitProduct}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre/Titulo de Producto
              </label>
              <input
                id="nameInput"
                type="text"
                className="form-control"
                placeholder="Ingrese el titulo"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength="30"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descripcion
              </label>
              <input
                id="descriptionInput"
                type="text"
                className="form-control"
                placeholder="Ingrese la descripcion"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="200"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Codigo
              </label>
              <input
                id="codeInput"
                type="text"
                className="form-control"
                placeholder="Ingrese codigo de producto"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength="6"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="url" className="form-label">
                Direccion de imagen / URL
              </label>
              <input
                id="urlInput"
                type="text"
                className="form-control"
                placeholder="Ingrese url de imagen"
                name="url"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                maxLength="300"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Precio en pesos
              </label>
              <input
                id="priceInput"
                type="number"
                className="form-control"
                placeholder="Ingrese el precio"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                maxLength="20"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                id="stockInput"
                type="number"
                className="form-control"
                placeholder="Ingrese el stock"
                name="price"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                max={999999}
                required
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-dark">
                Enviar
              </button>
              <button type="reset" className="btn btn-dark">
                Limpiar
              </button>
            </div>
          </form>
          <div className="col-1"></div>
        </div>
      </section>
      <section className="sect">
        <h3>
          Tabla de productos que hace un GET a /api/productos para traer todos
          los productos que haya
        </h3>
        <div className="row">
          <div className="col-12">
            <table className="table table-dark">
              <thead>
                <tr className="table-dark">
                  <th className="table-dark" scope="col">
                    ID
                  </th>
                  <th className="table-dark" scope="col">
                    Nombre
                  </th>
                  <th className="table-dark" scope="col">
                    Descripcion
                  </th>
                  <th className="table-dark" scope="col">
                    Precio
                  </th>
                  <th className="table-dark" scope="col">
                    Codigo
                  </th>
                  <th className="table-dark" scope="col">
                    Stock
                  </th>
                  <th className="table-dark" scope="col">
                    Imagen
                  </th>
                </tr>
              </thead>
              <tbody id="producInTable">
                {arrayProductos.map((productInfo, i) => (
                  <tr className="table-dark" key={i}>
                    <td className="table-dark">{productInfo._id}</td>
                    <td className="table-dark">{productInfo.nombre}</td>
                    <td className="table-dark">{productInfo.description}</td>
                    <td className="table-dark">{productInfo.price}</td>
                    <td className="table-dark">{productInfo.codigo}</td>
                    <td className="table-dark">{productInfo.stock}</td>
                    <td className="table-dark">
                      <img
                        src={productInfo.url}
                        className="img-table-products"
                        alt="foto de producto"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default DinamicTable;