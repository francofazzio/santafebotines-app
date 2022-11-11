import { Router } from "express";
import passport from 'passport';
import { loginController, loginPostController, logOutController, loginErrorController  } from "../controller/loginController.js";
import { registerController, registerPostController, registerErrorController } from "../controller/registerController.js";
import { logginMiddleware } from "../middleware/logginMiddleware.js";
import { upload } from '../middleware/multerMiddleware.js';

const router = Router()


router.get('/register', registerController)
router.post('/register', upload.single("userAvatar"), passport.authenticate("register", { failureRedirect: "/api/user/registerError" }), registerPostController)
router.get('/registerError', registerErrorController)


router.get('/login', loginController)
router.post('/login', passport.authenticate("login", { failureRedirect: "/api/user/loginError" }), loginPostController )
router.get('/logout', logginMiddleware, logOutController)
router.get('/loginError', loginErrorController)

export default router