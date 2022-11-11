import logger from "../utils/logger.js"

const logginMiddleware = (req, res, next) => {
    if(!req.session.user) {
        logger.info("Un usuario trato de navegar sin logearse")
        res.redirect("/api/user/login")
    } else {
        logger.info(`Usuario logeado: ${req.session.user}`)
        return next()
    }
}

export { logginMiddleware }