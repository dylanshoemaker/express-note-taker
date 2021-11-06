const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");


//who's that pokemon
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

//its pikachu
router.post("/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"))
  const newNote = req.body; //get info from body
  newNote.id = uuid.v4(); //assign an id
  notes.push(newNote); // push out that info
  fs.writeFileSync("./db/db.json", JSON.stringify(notes))   //https://attacomsian.com/blog/nodejs-read-write-json-files    //this is where that info will go
  res.json(notes);
})

//its cleFairy... 'although if its cleFairy then that means that my route didn't work, regardless goodbye cleFairy
router.delete("/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const deleteThatPokemon = notes.filter((cleFairy) => cleFairy.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(deleteThatPokemon))
  res.json(deleteThatPokemon);
})


module.exports = router;

