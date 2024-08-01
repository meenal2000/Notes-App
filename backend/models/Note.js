const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    content: { type: String, required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
