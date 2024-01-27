const mongoose=require("mongoose");

const { Subtopic, Topic, Stage, Field } = require('../models/courseModel.js');
const {Test,Question,Answer } = require('../models/testModel.js');

async function createTest(req, res) {
    try {
        const body = req.body;
        const stage_name = req.params.stage_name;

        if (!stage_name) {
            console.log("stage_name not provided")
            return res.status(400).json("Internal server error");
        }

        const { questions, answers } = body;

        if (!questions || !answers) {
            return res.status(400).json("Missing required input");
        }

        if (questions.length !== answers.length) {
            return res.status(400).json("Number of questions and answers should be the same");
        }

        if (!(questions.length === 15) || !(answers.length === 15)) {
            return res.status(400).json("Test can only be made of 15 marks");
        }
        const questionModels = questions.map(questionText => new Question({ Questions: questionText }));

        const answerModels = answers.map(answerText => new Answer({ Answers: answerText }));

        const test = new Test({
            stage_name: stage_name,
            questions: questionModels,
            answers: answerModels,
        });

        await test.save();

        res.status(201).json({ message: "Test created successfully", test: test });
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error");
    }
};

async function showTest(req,res){
    try{
        const stage_name=req.params.stage_name;
        if(!stage_name){
            return res.status(400).json("Internal server error");
        }
        const test= await Test.findOne({stage_name});
        if(!test){
            return res.status(400).json("No such test found");
        }
        return res.status(200).json({msg:"Test retrieved successfully",test:test.questions})

    }catch(error){
        console.error(error);
        res.status(500).json("Internal server error");
    }
}

async function evaluateTest(req,res){
    try{
        const stage_name=req.params.stage_name;
        if(!stage_name){
            return res.status(500).json("Internal server error");
        };
        const test= await Test.findOne({stage_name});
        if(!test){
            return res.status(400).json("No such stage found");
        }
        const{answers}=req.body;
        if(!answers||!Array.isArray(answers)/*||answers.length !== test.answers.length*/){
            return res.status(400).json("Invalid input");
        }
        let marks=0;
        for(let i=0;i<answers.length;i++){
            console.log("Saved Answer:",test.answers[i].Answers);
            console.log("Obtained answer:",answers[i]);
            if(answers[i]==test.answers[i].Answers){
                marks++;
            }
        }
        console.log("final marks:",marks);
        test.marks_scored=marks;
        await test.save();
        let status="Fail";

        if(marks>=10){
            status="Pass";
        }
        return res.status(200).json({msg:"Successfully evalauted test",score:`${marks}/15`,status:status});

    }catch(error){
        console.error(error);
        res.status(500).json("Internal server error");
    }
}



module.exports={createTest,showTest,evaluateTest};
