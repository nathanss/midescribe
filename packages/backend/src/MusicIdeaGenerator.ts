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
  Drums,
  MonophonicOrNot,
  Percussion,
} from "@midescribe/common";

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
      let instrumentPartialMatches = this.getPartialMatches(
        Instruments,
        textContent
      );
      let percussionPartialMatches = this.getPartialMatches(
        Percussion,
        textContent
      );

      let instrumentPartialMatches2 = instrumentPartialMatches;
      let percussionPartialMatches2 = percussionPartialMatches;

      let count = index + 1;
      let newTextContent = textContent;
      while (
        (instrumentPartialMatches2.length > 0 ||
          percussionPartialMatches2.length > 0) &&
        count < tokens.length
      ) {
        newTextContent += " " + tokens[count].text?.content;
        instrumentPartialMatches2 = this.getPartialMatches(
          Instruments,
          newTextContent
        );
        percussionPartialMatches2 = this.getPartialMatches(
          Percussion,
          newTextContent
        );
        if (
          instrumentPartialMatches2.length === 0 &&
          percussionPartialMatches2.length === 0
        ) {
          break;
        } else if (instrumentPartialMatches2.length > 0) {
          instrumentPartialMatches = instrumentPartialMatches2;
          percussionPartialMatches = [];
        } else if (percussionPartialMatches2.length > 0) {
          percussionPartialMatches = percussionPartialMatches2;
          instrumentPartialMatches = [];
        }
        count++;
      }

      if (instrumentPartialMatches.length > 0) {
        this.musicIdea.instrument = instrumentPartialMatches[0];
        this.markLookaheadVisited(
          instrumentPartialMatches[0].split(" ").length - 1,
          visited,
          index
        );
      } else if (percussionPartialMatches.length > 0) {
        this.musicIdea.isDrum = true;
        this.musicIdea.instrument = undefined;
        if (!this.musicIdea.drumLoop) {
          this.musicIdea.drumLoop = [];
        }
        this.musicIdea.drumLoop.push(percussionPartialMatches[0]);
        this.markLookaheadVisited(
          percussionPartialMatches[0].split(" ").length - 1,
          visited,
          index
        );
      }
    }
  }
  markLookaheadVisited(length: number, visited: Set<number>, index: number) {
    for (let i = 1; i <= length; i++) {
      visited.add(index + i);
    }
  }

  private hasMonophonicReference(textContent: string) {
    return MonophonicOrNot.hasOwnProperty(textContent);
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
