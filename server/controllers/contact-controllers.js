 const Contact=require("../models/contact-model");

 const contactForm= async(req,res) =>{
    try {
        const response=req.body;
        await Contact.create(response);
        return res.status(200).json({message:"Message send successfully"});
    } catch (error) {
        const status=422;
        const message=error.errors[0].message;
        const err={
            status,message,
        }
        console.log(err);
        next(err);
        
    }
 }


 module.exports=contactForm;