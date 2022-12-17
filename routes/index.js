const express = require(`express`);

const apiRoutes = require(`./notes`);
const pageRoutes = require(`./pages`);

const app = express();

app.use(`/notes`,apiRoutes);
app.use(`/`,pageRoutes);

module.exports = app;