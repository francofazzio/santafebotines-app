import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

function NavBar() {
  return (
    <header>
      <div>
        <Link to={"/"}>NombreDeLaTienda</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}> Home </Link>
          </li>
          <li>
            <Link to={"/productos"}> Productos </Link>
          </li>
          <li>Carrito</li>
          <li>Login</li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;