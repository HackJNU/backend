const mongoose=require("mongoose");

const questionSchema=new mongoose.Schema({
    Questions:{
        type:String,
    }
});

const answerSchema=new mongoose.Schema({
    Answers:{
        type:String,
    }
});

const testSchema=new mongoose.Schema({
    stage_name:{
        type:String,
    },
    questions:[questionSchema],
    answers:[answerSchema],
    marks_scored:{
        type:Number,
        default:0,
    }
});


const Test = mongoose.model('Test', testSchema);
const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);

module.exports = {Test,Question,Answer};