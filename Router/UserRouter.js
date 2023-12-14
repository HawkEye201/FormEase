var router = require("express").Router();
const UserService = require("../Services/UserService");

router.route("/login").get(UserService.loginGet).post(UserService.login);

router.get("/router", (req, res) => {
  res.send("User Router working fine");
});

module.exports = router;
