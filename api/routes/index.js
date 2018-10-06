const UtilityControllers = require("../controllers/Utilities");
const UserControllers = require("../controllers/User");
const { verifyToken } = require("../utilities/auth");


module.exports = app => {
  app.route("/ping").get(UtilityControllers.pingPong);
  // USER
  app.route("/register").post(UserControllers.register);
  app.route("/login").post(UserControllers.login);
  app.route("/auto-login").get(verifyToken, UserControllers.tokenLogin);
  app.route("/change-password").put(verifyToken, UserControllers.changePassword);
  app.route("/delete-account").delete(verifyToken, UserControllers.deleteUser);
};
