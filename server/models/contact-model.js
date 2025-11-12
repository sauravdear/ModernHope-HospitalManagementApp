

const {Schema,model,default:mongoose}=require("mongoose");

//Schema banaya
const contactSchema = new Schema({
   username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    organization:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true}
});

//creating collection

const Contact=new model("Contact",contactSchema);
//Sending outside
module.exports=Contact;