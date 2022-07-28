const checkAuthorization = (req, res, next) => {
    req.body.administrador = true;
    if (req.body.administrador) {
      next();
    } else {
      res
        .status(403)
        .send({
          error: -1,
          descripcion: `Ruta ${req.url} con método ${req.method} no autorizada`,
        });
    }
  };
  
  export { checkAuthorization };