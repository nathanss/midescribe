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

app.post("/getTextDescription", async (req, res) => {
  const text = req.body.text;
  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  client.ana
  const [result] = await client.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  res.json({
    message: "Done!"
  })
});