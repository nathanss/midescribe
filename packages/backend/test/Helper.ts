import { google } from "@google-cloud/language/build/protos/protos";

export function generateGoogleAnalyseSyntaxResponseFrom(
  sentence: string
): google.cloud.language.v1.IAnalyzeSyntaxResponse {
  return {
    sentences: [{ text: { content: sentence }, sentiment: null }],
    tokens: sentence.split(" ").map((token) => {
      return {
        text: {
          content: token,
        },
        partOfSpeech: {
          tag: token === "and" ? "CONJ" : token === "at" ? "ADP" : "NOUN",
        },
      };
    }),
    language: "en",
  };
}
