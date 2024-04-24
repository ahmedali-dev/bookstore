const refresh_token = require("../controllers/refresh_controller");
module.exports = (app) => {
  app.get("/refresh-token", refresh_token);
};
