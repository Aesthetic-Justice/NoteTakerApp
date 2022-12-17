const router = require(`express`).Router();
const { readFromFile, readAndAppend, writeToFile } = require(`../helpers/fsUtils`);
const { v4: uuidv4 } = require(`uuid`);
const db_path = `./db/db.json`;

//GET /api/notes
//return db.json as JSON
router.get(`/`, async (req,res) => {
    const result = await readFromFile(db_path);
    res.json(JSON.parse(result));
});

//POST /api/notes
//add to db.json then return db.json as JSON
router.post(`/`, (req,res) => {
    const { title, text } = req.body;

    if (title&&text){
        const newNote = {
            id: uuidv4(),
            title,
            text,
        };

        readAndAppend(newNote, db_path);

        const response = {
            status: `success`,
            body: newNote,
        };

        res.json(response);
    } else {
        res.json(`Error(POST): pushing new note failed`);
    }
});

//DELETE /api/notes/:id
// BONUS
router.delete(`/:id`, async (req,res) => {
    const {id} = req.params;

    if(id){
        //Grab data
        let data = await readFromFile(db_path);
        data = await JSON.parse(data);

        //Create new array without target object
        const newData = await data.filter((obj) => obj.id !== id);

        //Override JSON with new array
        writeToFile(db_path, newData);

        //return new array
        res.json(newData);
    } else {
        res.json(`ERROR(Delete): Deleting note by id failed`);
    };
});

module.exports = router;