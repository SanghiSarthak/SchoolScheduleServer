
const express = require('express');
const router = express.Router();
const College = require('../database/schema/collegeSchema');
const { getDay, isAdmin,isAuth } = require('../helper/helper');
const jwt = require('jsonwebtoken');
const cors= require('cors');
router.get('/', async (req, res) => {
    const {name} = req.body;
    try {
        const colleges = (name) ? await College.find({name}) : await College.find() ;
        res.json(colleges);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/new', async (req, res) => {
    const { name, schedule } = req.body;
    const data = req.body;
    console.log(req.body)
    try {
        const existing = await College.findOne({ name });
        if (!existing) {
            const newCollege = new College({ name , schedule });
            await newCollege.save();
            res.status(201).json(newCollege);
        }
        else {
            res.status(409).send("A college with this name already exists.");
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/updateTimeTable',isAuth ,isAdmin , async (req,res)=>{
    console.log("Update Time Table Request Received");
    let { name, schedule , teachers } = req.body;
    try {
        const existing = await College.findOne({ name });
        if (existing) {
            name = existing.name;
            await College.updateOne({name} ,{ $set : {schedule , teachers } } );
            res.status(200).json("Schedule Updated");
        }
        else {
            res.status(409).send("A college with this name does not exists.");
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/current', async(req,res)=>{
    const {name} = req.body;
    try {
        const existing = await College.findOne({ name });

        
        if (existing) {
            getDay(req,res)
            .then((data)=>{
                const day = data.currentDay.toLowerCase();
                const hour = data.currentHour + ":00";
                console.log( existing.schedule,day, hour)
                console.log(existing.schedule[day][hour]);
                if (existing.schedule && existing.schedule[day] && existing.schedule[day][hour]) {
                    console.log(existing.schedule[day][hour]);
                    res.status(201).json(existing.schedule[day][hour]);
                } else {
                    console.log("No event found for the current day and hour.");
                    res.json("No event found for the current day and hour.");
                }
                
            })
        }
        else {
            res.status(409).send("A college with this name does not exists.");
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/home', async(req,res)=>{
    const secretKey = 'secert';
    console.log("from home",req.user)
    const payload = {
        isAdmin : req.user.isAdmin
    };
    const token = jwt.sign(payload, secretKey);
    req.session.token = token;
    res.json({token});
})



module.exports = router;

