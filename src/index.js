import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./db/index.js";
import {app} from "./app.js";
import swaggerDocs from './swagger.js';

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server started at port ${process.env.PORT}`);
        swaggerDocs(app);
    })
})
.catch((err)=>{
    console.log("MONOGO CONNECTION ERROR!!!",err);
})