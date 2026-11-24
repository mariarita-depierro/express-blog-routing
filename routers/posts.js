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

  const sqlPostsWithTags = `
  SELECT
    posts.id AS post_id,
    posts.title,
    GROUP_CONCAT(tags.label SEPARATOR ', ') AS tags
FROM posts
LEFT JOIN post_tag ON post_tag.post_id = posts.id
LEFT JOIN tags ON post_tag.tag_id = tags.id
WHERE posts.id = ?
GROUP BY posts.id, posts.title; `;

  // esecuzione query
  connection.query(sql, [id], (err, results) => {
    if (err) return next(err);

    if (results.length === 0) {
      res.status(404).json({
        error: "Post not found",
      });
      return;
    }

    const post = results[0];

    connection.query(sqlPostsWithTags, [id], (err, resPostsWithTags) => {
      if (err) return next(err);

      post.posts = resPostsWithTags;

      res.json(post);
    });
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
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  const sql = `DELETE FROM posts WHERE id=?`;

  // esecuzione query
  connection.query(sql, [id], (err, results) => {
    if (err) return next(err);

    if (results.affectedRows === 0) {
      res.status(404).json({
        error: "Post not found",
      });
      return;
    }

    res.sendStatus(204);
  });
});

module.exports = router;
