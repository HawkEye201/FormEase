var mongoose = require("mongoose");

var ResponseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },

    userId: {
      type: String,
    },

    response: [
      {
        questionId: String,
        optionId: String,
      },
    ],
  },
  { timestamps: true }
);

Response = mongoose.model("Response", ResponseSchema, "Response");

module.exports = Response;
