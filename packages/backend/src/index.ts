import express from "express";
import { body, validationResult } from "express-validator";
import bodyParser from "body-parser";
import language from "@google-cloud/language";

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/analyzeEntities", body("text").isString(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const text = req.body.text;
  const client = new language.LanguageServiceClient();
  const [result] = await client.analyzeEntities({
    document: {
      content: text,
      type: "PLAIN_TEXT",
    },
    encodingType: "UTF8",
  });
  return res.json(result);
});

app.post("/analyzeSyntax", body("text").isString(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const text = req.body.text;
  const client = new language.LanguageServiceClient();
  const [result] = await client.analyzeSyntax({
    document: {
      content: text,
      type: "PLAIN_TEXT",
    },
    encodingType: "UTF8",
  });
  res.json(result);
});
