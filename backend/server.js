const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pocketnotes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const groupSchema = new mongoose.Schema({
  name: String,
  color: String,
});

const noteSchema = new mongoose.Schema({
  content: String,
  groupId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
});

const Group = mongoose.model('Group', groupSchema);
const Note = mongoose.model('Note', noteSchema);

app.get('/groups', async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
});

app.post('/groups', async (req, res) => {
  const newGroup = new Group(req.body);
  await newGroup.save();
  res.json(newGroup);
});

app.get('/notes/:groupId', async (req, res) => {
  const notes = await Note.find({ groupId: req.params.groupId });
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const newNote = new Note(req.body);
  await newNote.save();
  res.json(newNote);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
