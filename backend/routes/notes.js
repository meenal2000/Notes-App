const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a new note
router.post('/', async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get notes by group
router.get('/:groupId', async (req, res) => {
    try {
        const notes = await Note.find({ groupId: req.params.groupId });
        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
