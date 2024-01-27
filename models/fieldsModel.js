const mongoose=require("mongoose");

const fieldsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
    },
});


const Fields = mongoose.model('Field', fieldsSchema);
module.exports=Fields;
