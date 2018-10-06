const UtilityControllers = require("../controllers/Utilities");

module.exports = app => {
  app.route("/ping").get(UtilityControllers.pingPong);
};
