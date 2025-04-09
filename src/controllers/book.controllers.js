import {ApiResponse} from "../utils/apiResponse.js";
import { apiError} from "../utils/apiError.js";
import { Book } from "../models/book.model.js";
import { asynchandler } from "../utils/asynchandler.js";

const createBook = asynchandler(async (req, res) => {
    const {title, author, category, price, publishedDate} = req.body;
    const stringFields = [title, author, category];
    const hasEmptyString = stringFields.some(
      field => typeof field !== 'string' || field.trim() === ""
    );

    const isPriceInvalid = typeof price !== 'number' || isNaN(price);
    const publishedDateObj = new Date(publishedDate);
    const isDateInvalid = isNaN(publishedDateObj.getTime());
    if (hasEmptyString) {
        return res.status(400).json({ message: "All fields are required and must be valid." });
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
    const {author,category,rating,page,limit,sortBy,sortOrder}=req.query;
    const filter={};
    if(author){
        filter.author={$regex:author,$options:"i"};
    }
    if(category){
        filter.category={$regex:category,$options:"i"};
    }
    if(rating){
        filter.rating={$gte:rating};
    }

    const sortOption={};
    sortOption[sortBy]=sortOrder==="desc"?-1:1;


    const skip=(Number(page)-1)*Number(limit);
    const books=await Book.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));
    if(!books){
        throw new apiError(404,"Books not found");
    }
    
    const totalBooks = await Book.countDocuments(filter);
    return res.status(200).json(new ApiResponse(200, "Books fetched",{
        books,
        page:Number(page),
        limit:Number(limit),
        totalPages:Math.ceil(totalBooks/Number(limit)),
        totalBooks
    }));
})

const getBooksById = asynchandler(async (req, res) => {
    const {id} = req.params;
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
    const {id} = req.params;
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
    const {id} = req.params;
    if (!id) {
        throw new apiError(400, "Book id is required");
    }
    const book= await Book.findByIdAndDelete(id);
    if (!book) {
        throw new apiError(404, "Book not found");
    }
    return res.status(200).json(new ApiResponse(200, "Book deleted", book));
})

const searchBooks = asynchandler(async (req, res) => {
    const {title}=req.body;
    const filter={};
    if(title){
        filter.title={$regex:title,$options:"i"};
    }
    const book=await Book.find(filter).sort({createdAt:-1});
    if(!book){
        throw new apiError(404,"Books not found");
    }
    return res.status(200).json(new ApiResponse(200, "Book fetched", book));
})

export{
    createBook,
    getAllBooks,
    getBooksById,
    updateBookById,
    deleteBookById,
    searchBooks
}