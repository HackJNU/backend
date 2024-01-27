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


const Fieldss = mongoose.model('Fieldss', fieldsSchema);
module.exports= Fieldss;
