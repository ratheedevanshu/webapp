const { sendResponse } = require("../utilities/response");

const GameData = require('../models/gameData.models'); // Adjust the path based on your project structure

const addGameData = async function (req, res) {
    try {
        // Extract data from the request body
        const { userId, score, level, achievements } = req.body;
        const newGameData = new GameData({
            userId,
            score,
            level: level || 1, // Use provided level or default to 1
            achievements: achievements || [], // Use provided achievements or default to an empty array
        });


        

        // Save the new game data entry to the database
        const savedGameData = await newGameData.save();

        // Respond with the saved game data
        res.status(201).json(savedGameData);
    } catch (error) {
        console.error('Error creating game data entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const editGameData = async function (req, res) {
    try {
        const gameId = req.params.id; // Assuming the game data entry ID is passed in the URL parameters
        const existingGameData = await GameData.findById(gameId);
        if (!existingGameData) {
            return res.status(404).json({ error: 'Game data entry not found' });
        }
        const { userId, score, level, achievements } = req.body;
        if (!userId) {  
        res.status(500).json({ error: 'UserID not provided' });
        }
        if(userId == existingGameData.userId){
            if (score !== undefined) {
                existingGameData.score = score;
            }
            if (level !== undefined) {
                existingGameData.level = level;
            }
            if (achievements !== undefined) {
                existingGameData.achievements = achievements;
            }
            const updatedGameData = await existingGameData.save();
        res.status(200).json(updatedGameData);

        }else{
        res.status(500).json({ error: 'User and game mismatch' });

        }
        
    } catch (error) {
        console.error('Error editing game data entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteGameData = async function (req, res) {
    try {
        const gameId = req.params.id; 
        const { userId } = req.body;
        const existingGameData = await GameData.findById(gameId);
        if (!existingGameData) {
            return res.status(404).json({ error: 'Game data entry not found' });
        }
        if(userId == existingGameData.userId){
            await existingGameData.remove();
            res.status(200).json({ message: 'Game data entry deleted successfully' });
        }else{
        res.status(500).json({ error: 'User and game mismatch' });
        }    
    } catch (error) {
        console.error('Error deleting game data entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getGameDataByUserId = async function (req, res) {
    try {
        const userId = req.params.userId; 
        const gameDataList = await GameData.find({ userId });
        res.status(200).json(gameDataList);
    } catch (error) {
        console.error('Error retrieving game data entries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



  module.exports = {
     addGameData,
     editGameData,
     deleteGameData,
     getGameDataByUserId
  }