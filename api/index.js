const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const getTempes = require("./src/controllers/tempes");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    getTempes();
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
