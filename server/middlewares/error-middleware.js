

const errorMiddleware = async(err,req,res,next)=>{
     const status=500 || err.status;
     const extraDetails= err.extraDetails || "The backend error";
     const message = err.message || "Error from the backend";

     return res.status(status).json({message,extraDetails});

    }

    module.exports=errorMiddleware;