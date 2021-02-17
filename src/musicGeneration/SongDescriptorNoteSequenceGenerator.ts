import { INoteSequence, NoteSequence } from "@magenta/music/es6";
import {
  DEFAULT_TOTAL_TIME,
  DEFAULT_VELOCITY,
  EncodingType,
  KeyToOffset,
  NotesDuration,
  Parser,
  Percussion,
  ScaleToValues,
  SongIdeaEntryPoint,
  TempoDescription,
} from "./SongIdeaInterfaces";
type NoteSequenceCreator = (a: INoteSequence) => NoteSequence;

export class SongDescriptorNoteSequenceGenerator {
  private properties: SongIdeaEntryPoint;
  private timeSignature: { numerator: number; denominator: number };
  constructor(
    properties: SongIdeaEntryPoint,
    private noteSequenceCreator: NoteSequenceCreator
  ) {
    this.properties = {
      tempo: properties.tempo || "120",
      tempoDescription: properties.tempoDescription,
      key: properties.key || "c",
      timeSignature: properties.timeSignature || "4:4",
      scale: properties.scale || "major",
      notesDuration: properties.notesDuration || "quarter notes",
      isDrum: properties.isDrum || false,
      drumPowerHand: properties.drumPowerHand || "closed hihat",
      drumLoop: properties.drumLoop || ["kick", "snare"],
      drumOpeningHit: properties.drumOpeningHit || "crash cymbal",
    };
    const [numerator, denominator] = this.properties.timeSignature
      .split(":")
      .map((a) => parseInt(a, 0));
    this.timeSignature = {
      numerator: numerator || 4,
      denominator: denominator || 4,
    };
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

    let pos = 0;

    for (
      let startTime = 0;
      startTime < DEFAULT_TOTAL_TIME;
      startTime += NotesDuration[this.properties.notesDuration!]
    ) {
      notes.push({
        quantizedStartStep: startTime,
        quantizedEndStep:
          startTime + NotesDuration[this.properties.notesDuration!],
        pitch: availableNotes[pos] + offset + 60,
        velocity: DEFAULT_VELOCITY,
      });
      pos = (pos + 1) % availableNotes.length;
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
        pitch: Percussion[this.properties.drumPowerHand!],
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
