const logginMiddleware = (req, res, next) => {
    if(!req.isAuthenticated()) {
        console.log("Un usuario trato de navegar sin logearse")

        console.log("----------------req.session-------------", req.session)
        
        res.redirect("/api/user/login")
    } else {
        console.log("----------------req.session-------------", req.session)
        console.log(`Usuario logeado: ${req.session.user}`)
        return next()
    }
}

export { logginMiddleware }