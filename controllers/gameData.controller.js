const { sendResponse } = require("../utilities/response");

const GameData = require('../models/gameData.models'); // Adjust the path based on your project structure

const addGameData = async function (req, res) {
    try {
        // Extract data from the request body
        const { userId, score, level, achievements } = req.body;
        const newGameData = new GameData({
            userId,
            score,
            level: level || 1, 
            achievements: achievements || [], 
        });
        const savedGameData = await newGameData.save();

    return sendResponse(res, 200, true, "Game data added successfully", json(savedGameData), null);
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
    return sendResponse(res, 200, true, "game data updated successfully ", json(updatedGameData), null);

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
    return sendResponse(res, 200, true, "entry not found ", {}, null);
        }
        if(userId == existingGameData.userId){
            await existingGameData.remove();
    return sendResponse(res, 200, true, "game data removed succesfully ", {}, null);
        }else{
    return sendResponse(res, 200, true, "user and game details mismatch ", result, null);

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
    return sendResponse(res, 200, true, "game data list  by usersid ", gameDataList, null);
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