const mongoose=require('mongoose');
const URI=process.env.MONGODB_URI;


const connectDb= async() =>{
    try {
        console.log("Connection successfull to the database.");
        await mongoose.connect(URI);
        
        
    } catch (error) {
        console.error("Database connection fail",error.message);
        process.exit(0);
    }
}

module.exports=connectDb;