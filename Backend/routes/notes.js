const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const NotesSch = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const { default: nodemon } = require("nodemon");


router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await NotesSch.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


router.post('/addnote', fetchuser,
    [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        //console.log(req.body)
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new NotesSch({
                title, description, tag, user: req.user.id
            })
            const savednote = await note.save()
            res.json({ savednote })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error occured" });
        }


    })


router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};


        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        console.log(req.params)
        let note = await NotesSch.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await NotesSch.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occured" });
    }


});



router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    //console.log(req.params)
    try {
        let note = await NotesSch.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await NotesSch.findByIdAndDelete(req.params.id);
        res.json({
            "success": "Note has been deleted",
            note: note
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occured" });
    }

});




module.exports = router;
