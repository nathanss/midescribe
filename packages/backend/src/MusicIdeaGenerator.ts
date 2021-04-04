import { google } from "@google-cloud/language/build/protos/protos";
import {
  SongIdeaEntryPoint,
  BpmUnitOfMeasures,
  TempoDescription,
  ScaleArray,
  ScaleType,
  KeysArray,
  KeysType,
  NotesDuration,
  Instruments,
  Percussion,
} from "@midescribe/common";
import { LevenshteinDistance } from "natural";

export default class MusicIdeaGenerator {
  private musicIdea: SongIdeaEntryPoint;
  constructor() {
    this.musicIdea = {};
  }
  generateFromAnalyzeEntitiesSyntax(
    analyzeSyntaxResponse: google.cloud.language.v1.IAnalyzeSyntaxResponse
  ): SongIdeaEntryPoint {
    const tokens = analyzeSyntaxResponse.tokens || [];
    const visited = new Set<number>();

    tokens.forEach((_, index) => {
      this.visit(tokens, index, visited);
    });
    this.musicIdea.timeSignature = "4:4";
    return this.musicIdea;
  }

  visit(
    tokens: google.cloud.language.v1.IToken[],
    index: number,
    visited: Set<number>
  ) {
    if (visited.has(index)) {
      return;
    }
    const token = tokens[index];
    const textContent = token.text?.content?.toLowerCase() || "";
    visited.add(index);
    if (this.isNumeric(token)) {
      const headTokenIndex = token.dependencyEdge?.headTokenIndex;
      if (headTokenIndex !== index && typeof headTokenIndex === "number") {
        const possibleBpmMeasure = tokens[
          headTokenIndex
        ].text?.content?.toLowerCase();
        if (BpmUnitOfMeasures.has(possibleBpmMeasure)) {
          visited.add(headTokenIndex);
          this.musicIdea.tempo = textContent;
        } else {
          //assume it is BPM anyways
          this.musicIdea.tempo = textContent;
        }
      }
    } else if (this.isTempoDescription(textContent)) {
      this.musicIdea.tempoDescription = textContent as any;
    } else if (this.isScaleDescription(textContent)) {
      this.musicIdea.scale = textContent;
    } else if (this.isKeyDescription(textContent)) {
      this.musicIdea.key = textContent;
    } else if (this.getNotesDuration(textContent)) {
      const notesDuration = this.getNotesDuration(textContent);
      this.musicIdea.notesDuration = notesDuration;
    } else {
      this.handleInstrumentsAndPercussion(textContent, tokens, index, visited);
    }
  }
  private handleInstrumentsAndPercussion(
    textContent: string,
    tokens: google.cloud.language.v1.IToken[],
    index: number,
    visited: Set<number>
  ) {
    const [
      newTextContent,
      instrumentPartialMatches,
      percussionPartialMatches,
    ] = this.getInstrumentAndPercussionPartialMatches(
      textContent,
      index,
      tokens
    );
    this.markLookaheadVisited(
      newTextContent.split(" ").length - 1,
      visited,
      index
    );
    this.addInstrumentOrPercussionBestMatch(
      instrumentPartialMatches,
      percussionPartialMatches,
      newTextContent
    );
  }

  private getInstrumentAndPercussionPartialMatches(
    textContent: string,
    index: number,
    tokens: google.cloud.language.v1.IToken[]
  ) {
    let instrumentPartialMatches = this.getPartialMatches(
      Instruments,
      textContent
    );
    let percussionPartialMatches = this.getPartialMatches(
      Percussion,
      textContent
    );

    let instrumentPartialMatchesAux = instrumentPartialMatches;
    let percussionPartialMatchesAux = percussionPartialMatches;

    let count = index + 1;
    let newTextContent = textContent;
    while (
      (instrumentPartialMatchesAux.length > 0 ||
        percussionPartialMatchesAux.length > 0) &&
      count < tokens.length
    ) {
      newTextContent += " " + tokens[count].text?.content;
      instrumentPartialMatchesAux = this.getPartialMatches(
        Instruments,
        newTextContent
      );
      percussionPartialMatchesAux = this.getPartialMatches(
        Percussion,
        newTextContent
      );
      if (
        instrumentPartialMatchesAux.length === 0 &&
        percussionPartialMatchesAux.length === 0
      ) {
        break;
      } else if (instrumentPartialMatchesAux.length > 0) {
        instrumentPartialMatches = instrumentPartialMatchesAux;
        percussionPartialMatches = [];
      } else if (percussionPartialMatchesAux.length > 0) {
        percussionPartialMatches = percussionPartialMatchesAux;
        instrumentPartialMatches = [];
      }
      count++;
    }

    return [newTextContent, instrumentPartialMatches, percussionPartialMatches];
  }

  private addInstrumentOrPercussionBestMatch(
    instrumentPartialMatches: any,
    percussionPartialMatches: any,
    newTextContent: string
  ) {
    if (
      instrumentPartialMatches.length > 0 &&
      percussionPartialMatches.length > 0
    ) {
      const [instrument, instrumentMatch] = this.getBetterMatch(
        instrumentPartialMatches,
        newTextContent
      );
      const [percussion, percussionMatch] = this.getBetterMatch(
        percussionPartialMatches,
        newTextContent
      );
      if (percussionMatch <= instrumentMatch) {
        this.addDrumLoop(percussion);
      } else {
        this.addInstrument(instrument);
      }
    } else if (instrumentPartialMatches.length > 0) {
      const [instrument] = this.getBetterMatch(
        instrumentPartialMatches,
        newTextContent
      );
      this.addInstrument(instrument);
    } else if (percussionPartialMatches.length > 0) {
      const [percussion] = this.getBetterMatch(
        percussionPartialMatches,
        newTextContent
      );
      this.addDrumLoop(percussion);
    }
  }

  private addInstrument(instrument: any) {
    this.musicIdea.instrument = instrument;
  }
  private addDrumLoop(percussionMatch: any) {
    this.musicIdea.isDrum = true;
    this.musicIdea.instrument = undefined;
    if (!this.musicIdea.drumLoop) {
      this.musicIdea.drumLoop = [];
    }
    this.musicIdea.drumLoop.push(percussionMatch);
  }
  private getBetterMatch(
    instrumentPartialMatches: string[],
    newTextContent: string
  ) {
    let min = +Infinity;
    let result = instrumentPartialMatches[0];
    instrumentPartialMatches.forEach((match) => {
      const distance = LevenshteinDistance(match, newTextContent);
      if (distance < min) {
        min = distance;
        result = match;
      }
    });
    return [result, min];
  }
  private markLookaheadVisited(
    length: number,
    visited: Set<number>,
    index: number
  ) {
    for (let i = 1; i <= length; i++) {
      visited.add(index + i);
    }
  }

  private getPartialMatches(object: any, textContent: string): any {
    return Object.keys(object).filter((key) => key.search(textContent) !== -1);
  }
  private getNotesDuration(textContent: string): any {
    return this.findPropertyThatStartsWith(NotesDuration, textContent);
  }

  private findPropertyThatStartsWith(object: any, textContent: string) {
    return Object.keys(object).find((noteDuration) => {
      return noteDuration.startsWith(textContent);
    });
  }
  private isKeyDescription(textContent: string): textContent is KeysType {
    return KeysArray.includes(textContent);
  }
  private isScaleDescription(textContent: string): textContent is ScaleType {
    return ScaleArray.includes(textContent);
  }
  private isTempoDescription(content: string) {
    return TempoDescription.hasOwnProperty(content);
  }

  private isNumeric(token: google.cloud.language.v1.IToken) {
    return !isNaN(parseInt(token.text?.content || ""));
  }
}
