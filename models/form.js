var mongoose = require("mongoose");

var FormSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,

    description: {
      type: String,
      default: "",
    },

    questions: [
      {
        questionText: String,
        questionImage: { type: String, default: "" },
        options: [
          {
            optionText: String,
            optionImage: { type: String, default: "" },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

Form = mongoose.model("Form", FormSchema, "Form");

module.exports = Form;
