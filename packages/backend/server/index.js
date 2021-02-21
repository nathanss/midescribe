const express = require("express");
const bodyParser = require("body-parser");
const language = require("@google-cloud/language");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/analyzeEntities", async (req, res) => {
  const text = req.body.text;
  const client = new language.LanguageServiceClient();
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  const [result] = await client.analyzeEntities({document: document});
  res.json(result);
});