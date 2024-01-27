const express = require("express");
const router = express.Router();

const addNewFields= require("../controllers/fieldController.js").addNewFields;
const showAllFields = require("../controllers/fieldController.js").showAllFields;

router.post("/addNewField",addNewFields);
router.get("/showAllFields",showAllFields);



module.exports=router;
