const sheets = require("../plugins/GoogleSheet");
const FormModel = require("../models/form");
const ResponseModel = require("../models/response");

module.exports = {
  createSheet: async (req, res) => {
    try {
      var formId = req.params.formId;
      await FormModel.findOne({ _id: formId }).then(async (form) => {
        if (form == null) {
          res.status(404).send("Form not found");
        } else {
          const formQuestions = form.questions.map(
            (question) => question.questionText
          );

          const formRespones = await ResponseModel.find({
            formId: formId,
          }).lean();

          const optionIdToTextMap = new Map();
          form.questions.forEach((question) => {
            question.options.forEach((option) => {
              optionIdToTextMap.set(option._id.toString(), option.optionText);
            });
          });

          const values = [["UserId", ...formQuestions]];

          formRespones.forEach((res) => {
            var dataRow = [res.userId];
            res.response.forEach((option) => {
              const optionId = option.optionId;
              const responseText = optionIdToTextMap.get(optionId);
              console.log(optionId, responseText);
              dataRow.push(responseText);
            });
            values.push(dataRow);
          });
          // console.log(optionIdToTextMap);
          // console.log(values);

          sheets.spreadsheets.create(
            {
              resource: {
                properties: {
                  title: form.name,
                },
              },
            },
            (err, response) => {
              if (err) {
                console.log(`The API returned an error: ${err}`);
                res.send(err);
              } else {
                const spreadsheetId = response.data.spreadsheetId;
                console.log(
                  `New spreadsheet created with ID: ${spreadsheetId}`
                );
                return addData(
                  spreadsheetId,
                  values,
                  res,
                  response.data.spreadsheetUrl
                );
              }
            }
          );

          // res.status(200).json(form);
        }
      });
    } catch (error) {
      res.send(error);
    }
  },
};

const addData = (spreadsheetId, values, res, link) => {
  const sheetTitle = "Sheet1";
  const range = `${sheetTitle}!A1`;
  const requestBody = {
    values,
  };

  sheets.spreadsheets.values.update(
    {
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: requestBody,
    },
    (updateErr, updateRes) => {
      if (updateErr) {
        console.error("Error updating sheet:", updateErr.message || updateErr);
        return res.send(updateErr);
      }
      // console.log("Spreadsheet ID:", spreadsheetId);
      // console.log("Sheet Title:", sheetTitle);
      res.status(200).json(link);
    }
  );
};
