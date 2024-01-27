const express = require("express");
const field_router = express.Router();

const addNewFields= require("../controllers/fieldController.js").addNewFields;
const showAllFields = require("../controllers/fieldController.js").showAllFields;

field_router.post("/addNewField",addNewFields);
field_router.get("/showAllFields",showAllFields);



module.exports=field_router;