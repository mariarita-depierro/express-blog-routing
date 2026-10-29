function notFound(req, res, next) {
  res.status(404);

  res.json({
    status: 404,
    message: "Page Not Found",
  });
}

module.exports = notFound;
