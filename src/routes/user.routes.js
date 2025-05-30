import { Router } from "express";
import { authVerify } from "../middlewares/auth.middlewares.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    purchaseBook
} from "../controllers/user.controllers.js";


const router=Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authVerify,logoutUser);
router.route("/current").get(authVerify,getCurrentUser);
router.route("/purchase").get(authVerify,purchaseBook);



export default router;
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 */

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

/**
 * @swagger
 * /api/v1/users/current:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Current user details
 */
