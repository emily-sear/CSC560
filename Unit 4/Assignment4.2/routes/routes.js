const express = require('express');
const { update } = require('../model/model');
const Model = require('../model/model')
const router = express.Router();

module.exports = router;

//Post method 
router.post('/post', async (req, res) => {
    console.log(req.body)
    const data = new Model({
        name: req.body.name,
        position: req.body.position
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

// Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// Get by ID method 
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// update by ID method 
router.patch('/update/:id', async (req, res) => {
   try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = {new: true};

    const result = await Model.findByIdAndUpdate(id, updatedData, options)

    res.send(result)
   } catch (error) {
    res.status(400).json({message: error.message})
   }
})

// delete by ID method 
router.delete('/delete/:id',  async (req, res) => {
    try { 
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send('Document with ' + data.name + ' has been deleted');
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// get player with most amount of passing touchdowns
router.get('/get/mostPassingTouchdowns', async (req, res) => {
    try {
        const data = await Model.find().sort([['passingTouchdowns', -1]]).limit(1);
        res.json(data);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// get player with most amount of rushing yards
router.get('/get/mostRushingYards', async (req, res) => {
    try {
        const data = await Model.find().sort([['rushingYards', -1]]).limit(1);
        res.json(data);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// get player with least amount of rushing yards
router.get('/get/leastRushingYards', async (req, res) => {
    try {
        const data = await Model.aggregate([
            {
                "$match": {
                "rushingYards" : {"$exists": true}
            }
        },
            {
                "$sort" : { "rushingYards" : 1}
            }
        ]).limit(1)
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// players iwth most to least recieving yards 
router.get('/get/mostToLeastRecievingYards', async (req, res) => {
    try {
        const data = await Model.aggregate(
        [
            {
                "$match": {
                "recievingYards" : {"$exists": true}
            }
        },
            {
                "$sort" : { "recievingYards" : -1}
            }]
        )
        res.json(data);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// gets player with most amount of rushing yards 
router.get('/get/mostRushingYards', async (req, res) => {
    try {
        const data = await Model.find().sort([['rushingYards', -1]]).limit(1);
        res.json(data);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})