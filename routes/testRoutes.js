const express = require("express");
const router = express.Router();

const addTest= require("../controllers/testController.js").createTest;
const showTest= require("../controllers/testController.js").showTest;
const evaluateTest= require("../controllers/testController.js").evaluateTest;

router.post("/createTest/:stage_name",addTest);
router.get("/showTest/:stage_name",showTest);
router.post("/evaluateTest/:stage_name",evaluateTest);

module.exports=router;