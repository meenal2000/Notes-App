const express = require('express');
const router = express.Router();
const Group = require('../models/Group');

// Create a new group
router.post('/', async (req, res) => {
    try {
        const group = new Group(req.body);
        await group.save();
        res.status(201).send(group);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all groups
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).send(groups);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
