const express = require(`express`);

const apiRoutes = require(`./notes`);

const app = express();

app.use(`/notes`,apiRoutes);

module.exports = app;