const validation = require("./../utilities/validation");
//const reister_controller = require("./../controllers/register_controller");
const register_controller = require("./../controllers/register_controller");
module.exports = (app) => {
  app.post(
    "/register",
    register_controller.validation,
    validation,
    register_controller.registerUser
  );
};
