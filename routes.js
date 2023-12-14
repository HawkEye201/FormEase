var router = require("express").Router();

const UserRouter = require("./Router/UserRouter");
const FormRouter = require("./Router/FormRouter");

router.use("/user", UserRouter);
router.use("/form", FormRouter);

router.get("/router", (req, res) => {
  res.send("Router.js working fine");
});

module.exports = router;
