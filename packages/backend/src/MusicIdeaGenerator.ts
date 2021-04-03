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
    } else if (this.getInstrumentThroughSubstring(textContent)) {
      let instrumentNameBestEffort = this.getInstrumentThroughSubstring(
        textContent
      );
      let instrument = instrumentNameBestEffort;
      let possibleInstrument = textContent;
      let offset = index;
      while (offset + 1 < tokens.length) {
        possibleInstrument += ` ${tokens[offset + 1].text?.content}`;
        let hasExactInstrument = this.hasExactInstrument(possibleInstrument);
        if (hasExactInstrument) {
          instrument = possibleInstrument;
          offset++;
          break;
        }
        let test2 = this.getInstrumentThroughSubstring(possibleInstrument);
        if (test2) {
          instrument = test2;
        } else {
          break;
        }
        offset++;
      }
      if (instrument) {
        for (let i = index + 1; i <= offset; i++) {
          visited.add(i);
        }
        this.musicIdea.instrument = instrument;
      }
    } else if (this.getIsDrum(textContent)) {
      this.musicIdea.instrument = undefined;
      this.musicIdea.isDrum = true;
    } else if (this.hasMonophonicReference(textContent)) {
      this.musicIdea.monophonic = (MonophonicOrNot as any)[textContent];
    } else if (this.isDrumPart(textContent)) {
      this.musicIdea.instrument = undefined;
      this.musicIdea.isDrum = true;
      if (!this.musicIdea.drumLoop) {
        this.musicIdea.drumLoop = [];
      }
      this.musicIdea.drumLoop.push(textContent as any);
    } //missing opening hit and power hand
  }
  private hasExactInstrument(textContent: string) {
    return Instruments.hasOwnProperty(textContent);
  }
  private isDrumPart(textContent: string) {
    return this.findPropertyThatStartsWith(Percussion, textContent);
  }
  private hasMonophonicReference(textContent: string) {
    return MonophonicOrNot.hasOwnProperty(textContent);
  }
  private getIsDrum(textContent: string) {
    return Drums.includes(textContent);
  }
  private getInstrumentThroughSubstring(textContent: string): any {
    return Object.keys(Instruments).find(
      (instrument) => instrument.search(textContent) !== -1
    );
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
