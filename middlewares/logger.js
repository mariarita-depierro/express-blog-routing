const fs = require("fs");

function logger(req, res, next) {
  const log = `${new Date().toLocaleString()} [${req.method}] ${req.originalUrl}\n`;

  console.log(log);

  //Save logs in a dedicated file
  fs.appendFile("access.log", log, (err) => {
    if (err) console.log("Error to write log in the file", err);
  });

  next();
}

module.exports = logger;
