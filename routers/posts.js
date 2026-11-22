const express = require("express");
const logger = require("../middlewares/logger");
const connection = require("../data/db");

//Creazione del Router
const router = express.Router();

//Apply the middleware to this router
router.use(logger);

// Index (READ) - lista di posts
router.get("/", (req, res, next) => {
  // preparazione query
  const sql = "SELECT * FROM posts";

  // esecuzione query
  connection.query(sql, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

//Show (READ) - singolo post
router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  const sql = `SELECT * FROM posts WHERE id=?`;

  // esecuzione query
  connection.query(sql, [id], (err, results) => {
    if (err) return next(err);

    if (results.length === 0) {
      res.status(404).json({
        error: "Post not found",
      });
      return;
    }

    res.json(results[0]);
  });
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
