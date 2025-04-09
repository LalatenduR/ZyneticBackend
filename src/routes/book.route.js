import { Router } from "express";
import { authVerify } from "../middlewares/auth.middlewares.js";
import {
    createBook,
    getAllBooks,
    getBooksById,
    updateBookById,
    deleteBookById
} from "../controllers/book.controllers.js";


const router=Router();

router.route("/create").post(authVerify,createBook);
router.route("/").get(authVerify,getAllBooks);
router.route("/:id")
.get(authVerify,getBooksById)
.put(authVerify,updateBookById)
.delete(authVerify,deleteBookById);

export default router;