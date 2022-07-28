import React,{ useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductPage () {
    //variables
    const {id} = useParams();
    const navitage = useNavigate();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    //funciones
    const getProduct = async () => {
        try {
            const response = await fetch (`http://localhost:3001/api/productos/${id}`, { method: "get" });
            if (!response.ok) {
                navitage('/404')
                throw new Error ( `Error en GET: Status ${response.status} - ${response.statusText}`);
            }
            let data = await response.json();
            setProduct(data);
        } catch (error) {
            console.log("Error en el fecth: ", error);
        }
    }
    useEffect(()=>{
        getProduct().then(() => {
            setLoading(false);
        })
    },[id])
    //return
    return(
        <section className="sect">
            <h3>Pagina del producto que obtengo con un GET a /api/productos/:id </h3>
            {loading?(
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ):(
                <div className="row">
                <div className="col-12">
                    <table className="table table-dark">
                        <thead>
                            <tr className="table-dark">
                                <th className="table-dark" scope="col">ID</th>
                                <th className="table-dark" scope="col">Nombre</th>
                                <th className="table-dark" scope="col">Descripcion</th>
                                <th className="table-dark" scope="col">Precio</th>
                                <th className="table-dark" scope="col">Codigo</th>
                                <th className="table-dark" scope="col">Stock</th>
                                <th className="table-dark" scope="col">Imagen</th>
                            </tr>
                        </thead>
                        <tbody id="producInTable">
                            <tr className="table-dark">
                                <td className="table-dark">{product._id}</td>
                                <td className="table-dark">{product.nombre}</td>
                                <td className="table-dark">{product.description}</td>
                                <td className="table-dark">{product.price}</td>
                                <td className="table-dark">{product.codigo}</td>
                                <td className="table-dark">{product.stock}</td>
                                <td className="table-dark"><img src={product.url} className="img-table-products" alt="foto de producto"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            )}
        </section>
    )
}

export default ProductPage;