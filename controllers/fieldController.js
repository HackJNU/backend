const mongoose=require("mongoose");

const Fieldss = require('../models/fieldsModel.js');

async function addNewFields(req,res){
    try{
        const body=req.body;
        const name=body.name;
        if(!name){
            return res.status(400).json("Please enter name of field");
        }
        const description=body.description;
        if(!description){
            return res.status(400).json("Please enter description")
        }
        const obj={
            name:name,
            description:description,
        };
        const result =await Fieldss.create(obj);
        return res.status(200).json({msg:"New Field successfully added!",result:result});
    }catch(error){
        res.status(500).json("Internal server error");
        console.log(error);
    }
}

async function showAllFields(req,res){
    try{
        const obj=await Fields.find();
        console.log("obj:",obj);
        return res.status(200).json(obj);
    }catch(error){
        res.status(500).json("Internal server error");
        console.log(error);
    }
}

module.exports={addNewFields,showAllFields}
