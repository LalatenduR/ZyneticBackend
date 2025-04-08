import { Router } from "express";
import { authVerify } from "../middlewares/auth.middlewares.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    updateAccountDetails,
    getCurrentUser
} from "../controllers/user.controllers.js";


const router=Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authVerify,logoutUser);
router.route("/refresh").get(refreshAccessToken);
router.route("/").get(authVerify,getCurrentUser);
router.route("/update").patch(authVerify,updateAccountDetails);
router.route("/change-password").patch(authVerify,changeCurrentPassword);



export default router;