const User = require('../models/User');
const Note = require('../models/Note');


const getNotes = async (req, res) => {
    try {

        const notes = await Note.find().lean();

        if (!notes?.length) {
            return res.status(400).json({ message: "No notes found" });
        }

        const noteWithUsername = await Promise.all(notes.map(async (note) => {
            const user = await User.findById(note.user).lean().exec();
            return { ...note, username: user.username }
        }));

        res.json(noteWithUsername);

    } catch (err) {
        throw new Error(`Erro ${err}`);
    }
}

const createNote = async (req, res) => {
    try {
        const { username, title, text } = req.body;
        const userModel = await User.findOne({ username }).exec();



        if (!username || !title || !text || !userModel) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const duplicate = await Note.findOne({ title }).lean().exec();

        if (duplicate) {
            return res.status(409).json({ message: "Duplicates note title" });
        }

        const note = await Note.create({ user: userModel._id, title, text });


        if (note) {
            return res.status(201).json({ message: "Note was successfully created" });
        } else {
            return res.status(400).json({ message: "Invalid note data received" });
        }

    } catch (err) {
        throw new Error(`Erro ${err}`);
    }
}


const updatedNote = async (req, res) => {
    try {
        const { id, user, title, text, completed } = req.body;
        console.log(id, user, title, text, completed)

        if (!id || !user || !title || !text || typeof completed !== 'boolean') {
            return res.status(400).json({ message: "Required id of note" })
        }

        const note = await Note.findById(id).exec()

        if (!note) {
            return res.status(400).json({ message: "Note wasn't found" })
        }

        const duplicate = await Note.findOne({ title }).lean().exec();

        if (duplicate && duplicate?._id.toString() !== id) {
            return res.status(409).json({ message: 'Duplicate note title' })
        }

        const username = await User.findOne({ _id: user }).exec()


        note.user = username;
        note.title = title;
        note.text = text;
        note.completed = completed;

        const updatedNote = await note.save();

        res.json({ message: `${updatedNote.title} was successfully updated` })

    } catch (err) {
        throw new Error(`Erro ${err}`);
    }
}

const deleteNote = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Id fields is required" });
        }

        const note = await Note.findById(id).exec();

        if (!note) {
            return res.status(404).json({ message: "Note wasn't founded" });
        }

        const deletedNote = await note.deleteOne();

        const reply = `${note.title} was successfully deleted`;
        res.json(reply);

    } catch (err) {
        throw new Error(`Erro ${err}`);
    }
}


module.exports = {
    getNotes,
    createNote,
    updatedNote,
    deleteNote
}