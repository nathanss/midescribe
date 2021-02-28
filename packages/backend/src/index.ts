import express from "express";
import bodyParser from "body-parser";
import language from "@google-cloud/language";

import * as Test from "@midescribe/common";

Test.DEFAULT_TOTAL_TIME;

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
  const [result] = await client.analyzeEntities({
    document: {
      content: text,
      type: "PLAIN_TEXT",
    },
    encodingType: "UTF8",
  });
  res.json(result);
});

app.post("/analyzeSyntax", async (req: any, res: any) => {
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
