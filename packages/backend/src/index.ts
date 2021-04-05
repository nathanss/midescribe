import express from "express";
import cors from "cors";
import { body, validationResult } from "express-validator";
import bodyParser from "body-parser";
import language from "@google-cloud/language";
import MusicIdeaGenerator from "./MusicIdeaGenerator";

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN || false,
  })
);

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/generateMusicIdea", body("text").isString(), async (req, res) => {
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
  console.log(JSON.stringify(result));
  const musicIdea = new MusicIdeaGenerator().generateFromAnalyzeEntitiesSyntax(
    result
  );
  return res.json(musicIdea);
});
