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
  NotesDurationArray,
  ScaleToValues,
} from "@midescribe/common";
import { LevenshteinDistance } from "natural";

const ignoreList = new Set<any>(["CONJ", "ADP", "PUNCT"]);

export default class MusicIdeaGenerator {
  private musicIdea: SongIdeaEntryPoint;
  constructor() {
    this.musicIdea = {};
  }
  public generateFromAnalyzeEntitiesSyntax(
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

  private visit(
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
    if (ignoreList.has(token.partOfSpeech?.tag)) {
      return;
    }
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
    }  else if (this.isKeyDescription(textContent)) {
      this.musicIdea.key = textContent;
    } else if (this.getScaleDescription(textContent)) {
      this.musicIdea.scale = this.getBestMatchAndMarkVisit(
        ScaleArray,
        textContent,
        tokens,
        index,
        visited
      );
    } else if (this.getNotesDuration(textContent)) {
      this.musicIdea.notesDuration = this.getBestMatchAndMarkVisit(NotesDurationArray, textContent, tokens, index, visited);;
    } else {
      this.handleInstrumentsAndPercussion(textContent, tokens, index, visited);
    }
  }
  private getBestMatchAndMarkVisit(
    array: string[],
    textContent: string,
    tokens: google.cloud.language.v1.IToken[],
    index: number,
    visited: Set<number>
  ): any {
    let result: any = textContent;
    let resultAux = result;
    let textContentAux = textContent;
    while (resultAux && index + 1 < tokens.length) {
      textContentAux += " " + tokens[index + 1].text?.content?.toLowerCase();
      resultAux = array.find((a) => a === textContentAux);
      if (resultAux) {
        result = resultAux;
        textContent = textContentAux;
      }
    }
    this.markLookaheadVisited(
      textContent.split(" ").length - 1,
      visited,
      index
    );

    return result;
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
    if (instrumentPartialMatches.length === 0 && percussionPartialMatches.length === 0) {
      return;
    }
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
    let newTextContentAux = newTextContent;
    while (
      (instrumentPartialMatchesAux.length > 0 ||
        percussionPartialMatchesAux.length > 0) &&
      count < tokens.length
    ) {
      newTextContentAux += " " + tokens[count].text?.content?.toLowerCase();
      instrumentPartialMatchesAux = this.getPartialMatches(
        Instruments,
        newTextContentAux
      );
      percussionPartialMatchesAux = this.getPartialMatches(
        Percussion,
        newTextContentAux
      );
      if (
        instrumentPartialMatchesAux.length === 0 &&
        percussionPartialMatchesAux.length === 0
      ) {
        break;
      } else if (instrumentPartialMatchesAux.length > 0) {
        instrumentPartialMatches = instrumentPartialMatchesAux;
        percussionPartialMatches = [];
        newTextContent = newTextContentAux;
      } else if (percussionPartialMatchesAux.length > 0) {
        percussionPartialMatches = percussionPartialMatchesAux;
        instrumentPartialMatches = [];
        newTextContent = newTextContentAux;
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
  private getBetterMatch(partialMatches: string[], newTextContent: string) {
    let min = +Infinity;
    let result = partialMatches[0];
    partialMatches.forEach((match) => {
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
    for (let i = 1; i < length + 1; i++) {
      visited.add(index + i);
    }
  }

  private getPartialMatches(object: any, textContent: string): any {
    return Object.keys(object).filter((key) => key.search(textContent) !== -1);
  }
  private getNotesDuration(textContent: string): any {
    return this.findPropertyThatStartsWith(NotesDuration, textContent);
  }

  private getScaleDescription(textContent: string): any {
    return this.findPropertyThatStartsWith(ScaleToValues, textContent);
  }

  private findPropertyThatStartsWith(object: any, textContent: string) {
    return Object.keys(object).find((noteDuration) => {
      return noteDuration.startsWith(textContent);
    });
  }
  private isKeyDescription(textContent: string): textContent is KeysType {
    return KeysArray.includes(textContent);
  }

  private isNumeric(token: google.cloud.language.v1.IToken) {
    return !isNaN(parseInt(token.text?.content || ""));
  }
}
