import { ApiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apierrorhandler";
import { asynchandler } from "../utils/asynchandler.js";
import { Book } from "../models/book.model.js";

const createBook = asynchandler(async (req, res) => {
    const {title, author, category, price, publishedDate} = req.body;
    if ([title, author, category, price, publishedDate].some(field => !field?.trim() === "")) {
        throw new apiError(400, "All fields are required");
    }
    const book = await Book.create({
        title,
        author,
        category,
        price,
        publishedDate
    });
    const createdBook = await Book.findById(book._id);
    if (!createdBook) {
        throw new apiError(500, "Failed to create book");
    }
    return res.status(201).json(new ApiResponse(201, "Book created", createdBook));
})

const getAllBooks = asynchandler(async (req, res) => {
    const books = await Book.find({}).sort({createdAt:-1});
    if (!books) {
        throw new apiError(404, "Books not found");
    }
    return res.status(200).json(new ApiResponse(200, "Books fetched", books));
})

const getBooksById = asynchandler(async (req, res) => {
    const {id} = req.params._id;
    if (!id) {
        throw new apiError(400, "Book id is required");
    }
    const book= await Book.findById(id);
    if (!book) {
        throw new apiError(404, "Book not found");
    }
    return res.status(200).json(new ApiResponse(200, "Book fetched", book));
})

const updateBookById = asynchandler(async (req, res) => {
    const {id} = req.params._id;
    const updates=req.body;
    if (!updates) {
        throw new apiError(400, "Book updates are required");
    }
    if (!id) {
        throw new apiError(400, "Book id is required");
    }

    const book= await Book.findByIdAndUpdate(
        id,
        {
            $set:{
                ...updates
            }
        },
        {
            new:true,
            runValidators:true
        }
    )
    if (!book) {
        throw new apiError(404, "Book not found");
    }
    return res.status(200).json(new ApiResponse(200, "Book updated", book));
})

const deleteBookById = asynchandler(async (req, res) => {
    const {id} = req.params._id;
    if (!id) {
        throw new apiError(400, "Book id is required");
    }
    const book= await Book.findByIdAndDelete(id);
    if (!book) {
        throw new apiError(404, "Book not found");
    }
    return res.status(200).json(new ApiResponse(200, "Book deleted", book));
})

export{
    createBook,
    getAllBooks,
    getBooksById,
    updateBookById,
    deleteBookById
}