const streamData = require("./streamData");

module.exports = function(app) {
  app.use("/api/stream", streamData);
};
