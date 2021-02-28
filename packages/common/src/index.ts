export interface SongIdeaEntryPoint {
  tempo?: string;
  tempoDescription?: keyof typeof TempoDescription;
  scale?: ScaleType;
  key?: KeysType;
  notesDuration?: keyof typeof NotesDuration;
  instrument?: keyof typeof Instruments;
  timeSignature: string;
  monophonic?: boolean;
  isDrum?: boolean;
  drumPowerHand?: keyof typeof Percussion;
  drumLoop?: Array<keyof typeof Percussion>;
  drumOpeningHit?: keyof typeof Percussion;
}

export const ScaleArray = ["major", "minor"];
export type ScaleType = "major" | "minor";

export const ScaleToValues = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 9, 10],
  undefined: [0, 2, 4, 5, 7, 9, 11],
};

export const KeysArray = [
  "c",
  "c#",
  "d",
  "d#",
  "e",
  "f",
  "f#",
  "g",
  "g#",
  "a",
  "a#",
  "b",
];

export type KeysType =
  | "c"
  | "c#"
  | "d"
  | "d#"
  | "e"
  | "f"
  | "f#"
  | "g"
  | "g#"
  | "a"
  | "a#"
  | "b";

export const KeyToOffset = {
  c: 0,
  "c#": 1,
  d: 2,
  "d#": 3,
  e: 4,
  f: 5,
  "f#": 6,
  g: 7,
  "g#": 8,
  a: 9,
  "a#": 10,
  b: 11,
  undefined: 0,
};

export const Percussion = {
  kick: 36,
  snare: 38,
  hihat: 42,
  "closed hihat": 42,
  "open hihat": 46,
  "crash cymbal": 49,
};

export const NotesDuration = {
  "quarter notes": 4,
  "eighth notes": 2,
  "sixteenth notes": 1,
};

export const TempoDescription = {
  fast: 180,
};

export const Instruments = {
  piano: 1,
  "electric guitar": 30,
  bass: 34,
  violin: 41,
  "synth lead": 82,
  "synth pad": 89,
};

export interface TimeSignature {
  nominator: number;
  denominator: number;
}

export type ScaleToNotes = Record<KeysType, Note[]>;

export type Note = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const DEFAULT_VELOCITY = 100;

export const DEFAULT_TOTAL_TIME = 32;

export const EncodingType = {
  UNKNOWN_ENCODING_TYPE: 0,
  MUSIC_XML: 1,
  ABC: 2,
  MIDI: 3,
  MUSICNET: 4,
};

export const Parser = {
  UNKNOWN_PARSER: 0,
  MUSIC21: 1,
  PRETTY_MIDI: 2,
  MAGENTA_MUSIC_XML: 3,
  MAGENTA_MUSICNET: 4,
  MAGENTA_ABC: 5,
  TONEJS_MIDI_CONVERT: 6,
};
