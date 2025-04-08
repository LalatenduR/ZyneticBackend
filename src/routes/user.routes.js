import { Router } from "express";
import { authVerify } from "../middlewares/auth.middlewares.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
} from "../controllers/user.controllers.js";


const router=Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authVerify,logoutUser);
router.route("/current").get(authVerify,getCurrentUser);



export default router;