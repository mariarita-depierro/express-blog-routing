const express = require("express");
const logger = require("../middlewares/logger");

//Creazione del Router
const router = express.Router();

//Apply the middleware to this router
router.use(logger);

// Index (READ) - lista di posts
router.get("/", (req, res, next) => {
  /* Version 1
   console.log(lorem); */

  try {
    const error = true; //query al DB che ha ritornato un errore
    if (error) {
      throw new Error("Error with DB query! Please try later");
    }

    res.send("Lista dei posts");
  } catch (error) {
    next(error);
  }
});

//Show (READ) - singolo post
router.get("/:id", (req, res) => {
  const id = req.params.id;

  res.send(`Post from DB with id: ${id}`);
});

//Store (CREATE) - crea nuovo post
router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);

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
