import { expect } from "chai";
import MusicIdeaGenerator from "../src/MusicIdeaGenerator";
import { generateGoogleAnalyseSyntaxResponseFrom } from "./Helper";

describe("Music Idea Generator", () => {
  // the tests container

  let musicGenerator: MusicIdeaGenerator;

  beforeEach(() => {
    musicGenerator = new MusicIdeaGenerator();
  });
  it("kick and snare", () => {
    const response = musicGenerator.generateFromAnalyzeEntitiesSyntax(
      generateGoogleAnalyseSyntaxResponseFrom("kick and snare")
    );
    expect(response).to.deep.equal({
      isDrum: true,
      instrument: undefined,
      timeSignature: "4:4",
      drumLoop: ["kick", "snare"],
    });
  });
  it("piano at C major scale", () => {
    const response = musicGenerator.generateFromAnalyzeEntitiesSyntax(
      generateGoogleAnalyseSyntaxResponseFrom("piano at C major scale")
    );
    expect(response).to.deep.equal({
      instrument: "electric piano",
      key: "c",
      scale: "major",
      timeSignature: "4:4",
    });
  });
  it("drum beat at 120 bpm with eighth notes, kick and snare", () => {
    const response = musicGenerator.generateFromAnalyzeEntitiesSyntax(
      generateGoogleAnalyseSyntaxResponseFrom(
        "drum beat at 120 bpm with eighth notes kick and snare"
      )
    );
    expect(response).to.deep.equal({
      notesDuration: "eighth notes",
      isDrum: true,
      instrument: undefined,
      drumLoop: ["kick", "snare"],
      timeSignature: "4:4",
    });
  });
  it("pad with sixteenth notes", () => {
    const response = musicGenerator.generateFromAnalyzeEntitiesSyntax(
      generateGoogleAnalyseSyntaxResponseFrom("pad with sixteenth notes")
    );
    expect(response).to.deep.equal({
      instrument: "pad 2 warm",
      notesDuration: "sixteenth notes",
      timeSignature: "4:4",
    });
  });

  it("C# minor pentatonic", () => {
    const response = musicGenerator.generateFromAnalyzeEntitiesSyntax(
      generateGoogleAnalyseSyntaxResponseFrom("C# minor pentatonic")
    );
    expect(response).to.deep.equal({
      key: "c#",
      scale: "minor pentatonic",
      timeSignature: "4:4",
    });
  });

  it("Pizzicato Strings with sixteenth notes", () => {
    const response = musicGenerator.generateFromAnalyzeEntitiesSyntax(
      generateGoogleAnalyseSyntaxResponseFrom(
        "Pizzicato Strings with sixteenth notes"
      )
    );
    expect(response).to.deep.equal({
      instrument: "pizzicato strings",
      notesDuration: "sixteenth notes",
      timeSignature: "4:4",
    });
  });

  it("Pizzicato Strings with sixteenth notes and melodic minor", () => {
    const response = musicGenerator.generateFromAnalyzeEntitiesSyntax(
      generateGoogleAnalyseSyntaxResponseFrom(
        "Pizzicato Strings with sixteenth notes and melodic minor"
      )
    );
    expect(response).to.deep.equal({
      instrument: "pizzicato strings",
      notesDuration: "sixteenth notes",
      scale: "melodic minor",
      timeSignature: "4:4",
    });
  });
});
