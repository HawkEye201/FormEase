const express = require("express");
const {
  createForm,
  formsGet,
  getFormById,
  deleteForm,
  getAllFormsOfUser,
  allResponses,
  submitResponse,
  getResponse,
} = require("../Services/FormService");

const { createSheet } = require("../Services/GoogleSheetService");

var router = express.Router();

router.route("/create").post(createForm);
router.route("/forms").get(formsGet);
router.route("/form/:formId").get(getFormById);
router.route("/deleteform/:formId/:userId").delete(deleteForm);
router.route("/getuserforms/:userId").get(getAllFormsOfUser);
router.route("/addresponse").post(submitResponse);
router.route("/responses").get(allResponses);

router.route("/getresponse/:formId").get(getResponse);

router.route("/sheet/:formId").post(createSheet);

router.get("/router", (req, res) => {
  res.send("Form Router working fine");
});

module.exports = router;
