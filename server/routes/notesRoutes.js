const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT)

router.route('/')
    .get(notesController.getNotes)
    .post(notesController.createNote)
    .patch(notesController.updatedNote)
    .delete(notesController.deleteNote)


module.exports = router