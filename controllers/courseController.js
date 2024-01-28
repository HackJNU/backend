const mongoose=require("mongoose");

const { Subtopic, Topic, Stage, Field } = require('../models/courseModel.js');
const { texttospeech } = require("googleapis/build/src/apis/texttospeech/index.js");

/*async function addStages(req,res){
    try{

        const fieldName = req.params.field;
        const { stages } = req.body;
    
        if (!fieldName || !stages || !Array.isArray(stages)) {
          return res.status(400).json({ error: 'Invalid request data' });
        }
    
        let field = await Field.findOne({ name: fieldName });
        if (!field) {
          field = new Field({ name: fieldName, stages: [] });
        }
    
        field.stages.push(...stages);
    
        await field.save();
    
        res.status(201).json({ message: 'Courses added successfully', data: field });
    }catch(error){
        res.status(500).json("Internal server error");
        console.log(error);
    }
};*/
async function addStages(req, res) {
  try {
    const fieldName = req.params.field;
    const { stages } = req.body;

    if (!fieldName || !stages || !Array.isArray(stages)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    let field = await Field.findOne({ name: fieldName });
    if (!field) {
      field = new Field({ name: fieldName, stages: [], is_unlocked: false });
    }

    field.stages.push(...stages);
    field.is_unlocked = false; // Ensure is_unlocked is set to false

    await field.save();

    res.status(201).json({ message: 'Courses added successfully', data: field });
  } catch (error) {
    res.status(500).json("Internal server error");
    console.log(error);
  }
}

async function addContent(req,res){
    try{
        const body=req.body;

        const text=body.text;
        if(!text){
            return res.status(400).json("Content not provided");
        };
        const obj={
            text:text,
        }
        const add_text=Subtopic.create(obj);
        return res.status(200).json({msg:"Text added successfully",text:obj.text});        
    }catch(error){
        res.status(500).json("Internal server error");
        console.log(error);
    }
}

async function getStages(req, res) {
    try {
      const fieldName = req.params.field;
  
      if (!fieldName) {
        return res.status(400).json({ error: 'Invalid request data' });
      }
  
      let field = await Field.findOne({ name: fieldName });
  
      if (!field) {
        return res.status(404).json({ error: 'Field not found' });
      }
  
      res.status(200).json({ data: field.stages });
    } catch (error) {
      res.status(500).json("Internal server error");
      console.error(error);
    }
  }

  /*  async function addCourseName(req, res) {
    try {
      const field = req.params.field;
      const stagesArray = req.body.stages;

      if (!field) {
        return res.status(400).json("Internal server error");
      }
  
      if (!field || !stagesArray || !Array.isArray(stagesArray)) {
        return res.status(400).json("Invalid request format");
      }
      // Create an object with the name field and empty stages array
      const courseData = {
        name: field,
        stages: stagesArray,
      };
  
      // Update the corresponding document in the MongoDB collection
      // Assuming you have a model named 'Course' for the fieldSchema
      await Field.updateOne({ name: field }, courseData, { upsert: true });
  
      res.status(200).json("Course name added successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
      console.error(error);
    }
  }*/

  async function addCourseName(req, res) {
    try {
      const field = req.params.field;
      const stagesArray = req.body.stages;
  
      if (!field || !stagesArray || !Array.isArray(stagesArray)) {
        return res.status(400).json("Invalid request format");
      }
  
      // Convert the array of strings into an array of objects
      const mappedStages = stagesArray.map((stageName) => ({
        name: stageName,
        topics: [], // Initialize with an empty array for topics
      }));
  
      // Create an object with the name field and stages array
      const courseData = {
        name: field,
        stages: mappedStages,
      };
  
      // Assuming you have a model named 'Field' for the fieldSchema
      await Field.updateOne({ name: field }, courseData, { upsert: true });
  
      res.status(200).json("Course name and stages added successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
      console.error(error);
    }
  }
  async function addStage(req, res) {
    try {
      const stageName = req.params.stagename;
      const topicsArray = req.body.topics;
  
      if (!stageName || !topicsArray || !Array.isArray(topicsArray)) {
        return res.status(400).json("Invalid request format");
      }
  
      // Convert the array of strings into an array of objects
      const mappedTopics = topicsArray.map((topicName) => ({
        name: topicName,
        subtopics: [], // Initialize with an empty array for subtopics
      }));
  
      // Create an object with the name field and topics array
      const stageData = {
        name: stageName,
        topics: mappedTopics,
      };
  
      // Assuming you have a model named 'Stage' for the stageSchema
      await Stage.updateOne({ name: stageName }, stageData, { upsert: true });
  
      res.status(200).json("Stage name and topics added successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
      console.error(error);
    }
  }

  async function addAllStages(req, res) {
    try {
      const stageName = req.params.stagename;
      const topicsArray = req.body.topics;
  
      if (/*!stageName ||*/ !topicsArray || !Array.isArray(topicsArray)) {
        return res.status(400).json("Invalid request format");
      }
  
      // Convert the array of strings into an array of objects
      const mappedTopics = topicsArray.map((topicName) => ({
        name: topicName,
        subtopics: [], // Initialize with an empty array for subtopics
      }));
  
      // Create an object with the name field and topics array
      const stageData = {
        name: stageName,
        topics: mappedTopics,
      };
  
      // Assuming you have a model named 'Stage' for the stageSchema
      await Stage.updateOne({ name: stageName }, stageData, { upsert: true });
  
      res.status(200).json("Stage name and topics added successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
      console.error(error);
    }
  }
  
  async function addAllSubtopicsToTopic(req, res) {
    try {
      const topicName = req.params.topicname;
      const subtopicsArray = req.body.subtopics;
  
      if (!topicName || !subtopicsArray || !Array.isArray(subtopicsArray)) {
        return res.status(400).json("Invalid request format");
      }
  
      // Convert the array of strings into an array of objects
      const mappedSubtopics = subtopicsArray.map((subtopicName) => ({
        name: subtopicName,
        text: "", // Customize this based on your schema
      }));
  
      // Create an object with the name field and subtopics array
      const topicData = {
        name: topicName,
        subtopics: mappedSubtopics,
      };
  
      // Assuming you have a model named 'Topic' for the topicSchema
      await Topic.updateOne({ name: topicName }, topicData, { upsert: true });
  
      res.status(200).json("Topic name and subtopics added successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
      console.error(error);
    }
  }
  
  async function addSubtopicText(req, res) {
    try {
      const subtopicName = req.params.subtopicname;
      const subtopicText = req.body.subtopicText;
  
      if (!subtopicName || !subtopicText) {
        return res.status(400).json("Invalid request format");
      }
  
      // Assuming you have a model named 'Subtopic' for the subtopicSchema
      const subtopic = await Subtopic.findOneAndUpdate(
        { name: subtopicName },
        { $set: { text: subtopicText } },
        { new: true, upsert: true }
      );
  
      res.status(200).json({
        message: "Subtopic text added successfully",
        subtopic: subtopic,
      });
    } catch (error) {
      res.status(500).json("Internal server error");
      console.error(error);
    }
  }
  
module.exports={addStages,addContent,getStages,addCourseName,addAllStages,addAllSubtopicsToTopic,addSubtopicText}
