const express = require("express");

//Creazione del Router
const router = express.Router();

// Index (READ) - lista di posts
router.get("/", (req, res) => {
  res.send("Lista dei posts");
});

//Show (READ) - singolo post
router.get("/:id", (req, res) => {
  const id = req.params.id;

  res.send(`Post from DB with id: ${id}`);
});

//Store (CREATE) - crea nuovo post
router.post("/", (req, res) => {
  res.send("Creazione nuovo post");
});

//Update (UPDATE) - modifica integrale del post
router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Post with id: ${id} updated`);
});

//Modify (UPDATE) - modifica parziale del post
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Post with id: ${id} modified`);
});

//Destroy (DELETE) - eliminazione del post
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Post with id: ${id} deleted`);
});

module.exports = router;
