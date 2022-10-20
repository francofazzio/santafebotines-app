const validateAdmin = (role) => {
    if (role === 'admin') {
        return ("plantillaProducts.ejs")
    } else {
        return ("plantillaUserProducts.ejs")
    }
}

export { validateAdmin }