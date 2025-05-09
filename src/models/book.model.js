import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const bookSchema=new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:Number,
        default:0,
        max:10,
        min:0,
    },
    publishedDate:{
        type:Date,
        required:true,
    },
    publishedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

bookSchema.plugin(mongooseAggregatePaginate);

export const Book=mongoose.model("Book",bookSchema);
