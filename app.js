//Common JS
const express = require("express");
const postsRouter = require("./routers/posts");
const logger = require("./middlewares/logger");

// SETUP
const app = express();
const port = 3000;

//MIDDLEWARE GLOBALI
app.use(express.static("public")); //Static Assets

app.use(logger);

//ROUTING

//home
app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

app.get("/posts", (req, res) => {
  const search = req.query.search;
  console.log(search);

  if (search) {
    res.send(`Get filtered posts by ${search}`);
  }
  res.send("Get all posts from DB");
});

/* Rotte per operazioni CRUD sull'entità posts*/
app.use("/posts", postsRouter);

//START SERVER
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

/* In questo esercizio andremo a creare il server back-end per la gestione di un nostro blog.

Creaiamo un nuovo progetto Express settando in un file app.js:  app, listen() e una rotta / con un testo semplice 'Server del mio blog'.

Testiamo la rotta / con Postman 

Settiamo gli asset statici dando come cartella di accesso la public

Creare un file di routing (routers/posts.js) che conterrà le rotte necessario per l'entità posts.

All'interno creare le rotte per le operazioni CRUD (Index, Show, Create, Update e Delete)

Tutte le risposte saranno, per ora, dei testi semplici che confermeranno l’operazione che il server deve eseguire, secondo le convenzioni REST. Ad esempio:
Se viene chiamata /posts col verbo GET ci aspettiamo “Lista dei post”;
Se viene chiamato /posts/1 col verbo DELETE ci aspettiamo “Cancellazione del post 1”
e via dicendo…

Registrare il router dentro app.js con il prefisso posts/.

Testare tuttle le rotte del router in Postman */

/* Lavorando sulla stessa repo dello scorso esercizio andiamo a definire i seguenti middleware:
Se viene generato un errore server side, un middleware si occuperà di rispondere con un messaggio e uno status appropriato.
Se viene chiamato un endpoint inesistente, un middleware dovrà rispondere un messaggio e uno status appropriato.
 */
