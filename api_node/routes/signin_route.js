const validation = require("./../utilities/validation");
//const reister_controller = require("./../controllers/register_controller");
const signin_controller = require("./../controllers/signin_controller");
module.exports = (app) => {
  app.post(
    "/signin",
    // signin_controller.validation,
    // validation,
    signin_controller.signinUser
  );
};
