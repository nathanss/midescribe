import { INoteSequence, NoteSequence } from "@magenta/music/es6";
import {
  DEFAULT_TOTAL_TIME,
  DEFAULT_VELOCITY,
  EncodingType,
  Instruments,
  KeysArray,
  KeyToOffset,
  NotesDuration,
  Parser,
  Percussion,
  ScaleArray,
  ScaleToValues,
  SongIdeaEntryPoint,
  TempoDescription,
} from "@midescribe/common";
type NoteSequenceCreator = (a: INoteSequence) => NoteSequence;

export class SongDescriptorNoteSequenceGenerator {
  private properties: SongIdeaEntryPoint;
  private timeSignature: { numerator: number; denominator: number };
  private readonly MIN_TEMPO = 60;
  private readonly MAX_TEMPO = 200;

  constructor(
    properties: SongIdeaEntryPoint,
    private noteSequenceCreator: NoteSequenceCreator
  ) {
    this.properties = {
      tempo: properties.tempo || this.pickRandomTempo(),
      tempoDescription: properties.tempoDescription,
      key: properties.key || (this.getRandomValueFromArray(KeysArray) as any),
      timeSignature: properties.timeSignature || "4:4",
      scale:
        properties.scale || (this.getRandomValueFromArray(ScaleArray) as any),
      notesDuration:
        properties.notesDuration ||
        this.getRandomValueFromArray(Object.keys(NotesDuration) as any),
      isDrum: properties.isDrum || false,
      drumPowerHand: properties.drumPowerHand || "closed hi-hat",
      drumLoop: properties.drumLoop || ["kick", "snare"],
      drumOpeningHit: properties.drumOpeningHit || "crash cymbal",
      instrument:
        properties.instrument ||
        this.getRandomValueFromArray(Object.keys(Instruments) as any),
    };
    const [numerator, denominator] = this.properties
      .timeSignature!.split(":")
      .map((a) => parseInt(a, 0));
    this.timeSignature = {
      numerator: numerator || 4,
      denominator: denominator || 4,
    };
  }
  private getRandomValueFromArray<T>(array: T[]): T {
    const i = Math.floor(Math.random() * (array.length - 1));
    return array[i];
  }
  private pickRandomTempo() {
    let tempo =
      this.MIN_TEMPO +
      Math.floor((this.MAX_TEMPO - this.MIN_TEMPO) * Math.random());
    return tempo.toString();
  }

  public generateNoteSequence(): INoteSequence {
    const tempoAsDescribed =
      TempoDescription[this.properties.tempoDescription!];
    const tempo = parseInt(this.properties.tempo!, 0);
    let notes = [];
    if (this.properties.isDrum) {
      notes = [
        this.generateOpeningDrumHit(),
        ...this.generateMainLoop(),
        ...this.generatePowerHandHits(),
      ].filter(Boolean);
    } else {
      notes = [...(this.generateScaleMelody() || [])];
    }
    const noteSequence = this.noteSequenceCreator({
      ticksPerQuarter: 240,
      totalTime: DEFAULT_TOTAL_TIME,
      timeSignatures: [
        {
          time: 0,
          numerator: this.timeSignature.numerator,
          denominator: this.timeSignature.denominator,
        },
      ],
      tempos: [
        {
          time: 0,
          qpm: tempoAsDescribed || tempo,
        },
      ],
      sourceInfo: {
        encodingType: EncodingType.MIDI,
        parser: Parser.TONEJS_MIDI_CONVERT,
      },
      notes,
      quantizationInfo: { stepsPerQuarter: 4 },
      totalQuantizedSteps: DEFAULT_TOTAL_TIME,
    });
    return noteSequence;
  }

  private generateScaleMelody(): NoteSequence.INote[] | undefined {
    const availableNotes = ScaleToValues[this.properties.scale!];
    const offset = KeyToOffset[this.properties.key!];
    const notes: NoteSequence.INote[] = [];

    for (
      let startTime = 0;
      startTime < DEFAULT_TOTAL_TIME;
      startTime += NotesDuration[this.properties.notesDuration!]
    ) {
      const randomPos = Math.floor(Math.random() * (availableNotes.length - 1));
      notes.push({
        quantizedStartStep: startTime,
        quantizedEndStep:
          startTime + NotesDuration[this.properties.notesDuration!],
        pitch: availableNotes[randomPos] + offset + 60,
        velocity: DEFAULT_VELOCITY,
        program:
          Instruments[this.properties.instrument || "acoustic grand piano"],
      });
    }

    return notes;
  }
  private generatePowerHandHits(): NoteSequence.INote[] {
    const loop = [];
    for (
      let startTime = 0;
      startTime < DEFAULT_TOTAL_TIME;
      startTime += NotesDuration[this.properties.notesDuration!]
    ) {
      if (startTime === 0 && this.properties.drumOpeningHit) {
        continue;
      }
      loop.push({
        quantizedStartStep: startTime,
        quantizedEndStep:
          startTime + NotesDuration[this.properties.notesDuration!],
        pitch: Percussion[this.properties.drumPowerHand || "closed hi-hat"],
        velocity: DEFAULT_VELOCITY,
        isDrum: true,
      });
    }
    return loop;
  }
  private generateMainLoop(): NoteSequence.INote[] {
    const loop = [];
    let pos = 0;
    for (
      let startTime = 0;
      startTime < DEFAULT_TOTAL_TIME;
      startTime += NotesDuration[this.properties.notesDuration!]
    ) {
      loop.push({
        quantizedStartStep: startTime,
        quantizedEndStep:
          startTime + NotesDuration[this.properties.notesDuration!],
        pitch: Percussion[this.properties.drumLoop![pos]],
        velocity: DEFAULT_VELOCITY,
        isDrum: true,
      });
      pos = (pos + 1) % this.properties.drumLoop!.length;
    }
    return loop;
  }
  private generateOpeningDrumHit(): NoteSequence.INote {
    if (this.properties.drumOpeningHit) {
      return {
        quantizedStartStep: 0,
        quantizedEndStep: NotesDuration[this.properties.notesDuration!],
        pitch: Percussion[this.properties.drumOpeningHit],
        velocity: DEFAULT_VELOCITY,
        isDrum: true,
      };
    }
    return {};
  }
}
