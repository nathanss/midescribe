export interface SongIdeaEntryPoint {
  tempo?: string;
  tempoDescription?: keyof typeof TempoDescription;
  scale?: ScaleType;
  key?: KeysType;
  notesDuration?: keyof typeof NotesDuration;
  instrument?: keyof typeof Instruments;
  timeSignature?: string;
  monophonic?: boolean;
  isDrum?: boolean;
  drumPowerHand?: keyof typeof Percussion;
  drumLoop?: Array<keyof typeof Percussion>;
  drumOpeningHit?: keyof typeof Percussion;
}

export const DefaultValues: Record<keyof SongIdeaEntryPoint, any> = {
  tempo: "120",
  scale: "",
  key: "",
  notesDuration: "",
  instrument: "",
  isDrum: false,
  drumPowerHand: false,
  tempoDescription: "",
  timeSignature: "4:4",
  monophonic: false,
  drumLoop: [],
  drumOpeningHit: "",
};

export const SongIdeaProperties: Array<keyof SongIdeaEntryPoint> = [
  "tempo",
  "scale",
  "key",
  "notesDuration",
  "instrument",
  "isDrum",
  "drumPowerHand",
  "drumLoop",
  "drumOpeningHit",
];

export const SongIdeaPropertiesDescription: Partial<
  Record<keyof SongIdeaEntryPoint, string>
> = {
  tempo: "Tempo (BPM)",
  scale: "Scale",
  key: "Key",
  notesDuration: "The duration that you want most of your notes to be in",
  instrument:
    "The instrument you want to be played in Preview and imbued in the MIDI data",
  isDrum: "Whether the part is a drum beat or not",
  drumPowerHand:
    "In what part the beat is conducted (tipically hi-hat or ride)",
  drumLoop: "The drum parts that will be played (in a loop) during the beat",
  drumOpeningHit: "The drum part that is played at the beginning",
};

export const SongIdeaPropertiesSample: Partial<
  Record<keyof SongIdeaEntryPoint, string>
> = {
  tempo: "120 BPM",
  scale: "Minor Pentatonic",
  key: "C#",
  notesDuration: "Quarter Notes",
  instrument: "Electric Grand Piano",
  drumLoop: "Kick, kick, kick, snare",
};

export const ScaleArray = [
  "major",
  "minor",
  "harmonic minor",
  "melodic minor",
  "chromatic",
  "major pentatonic",
  "minor pentatonic",
];
export type ScaleType =
  | "major"
  | "minor"
  | "harmonic minor"
  | "melodic minor"
  | "chromatic"
  | "major pentatonic"
  | "minor pentatonic";

export const BpmUnitOfMeasures = new Set().add("bpm");

export const ScaleToValues: Record<ScaleType | "undefined", number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 9, 10],
  "harmonic minor": [0, 2, 3, 5, 7, 8, 11, 12],
  "melodic minor": [0, 2, 3, 5, 7, 9, 11, 12],
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  "major pentatonic": [0, 2, 4, 7, 9, 12],
  "minor pentatonic": [0, 3, 5, 7, 10, 12],
  undefined: [0, 2, 4, 5, 7, 9, 11, 12],
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
  "side stick": 37,
  snare: 38,
  "hand clap": 39,
  "low floor tom": 41,
  hihat: 42,
  "hi-hat": 42,
  "closed hi-hat": 42,
  "low tom": 45,
  "open hi-hat": 46,
  "low-mid tom": 47,
  "hi-mid tom": 48,
  "crash cymbal": 49,
  "high tom": 50,
  "ride cymbal": 51,
  "ride bell": 53,
};

export const NotesDuration = {
  "whole note": 16,
  "half note": 8,
  "quarter notes": 4,
  "eighth notes": 2,
  "sixteenth notes": 1,
};

export const TempoDescription = {
  fast: 180,
};

export const Instruments = {
  "acoustic grand piano": 0,
  "bright acoustic piano": 1,
  "electric grand piano": 2,
  "honky-tonk piano": 3,
  "electric piano": 4,
  harpsichord: 6,
  clavichord: 7,
  celesta: 8,
  glockenspiel: 9,
  "music box": 10,
  vibraphone: 11,
  marimba: 12,
  xylophone: 13,
  "tubular bells": 14,
  dulcimer: 15,
  "drawbar organ": 16,
  "percussive organ": 17,
  "rock organ": 18,
  "church organ": 19,
  "reed organ": 20,
  accordion: 21,
  harmonica: 22,
  "tango accordion": 23,
  "acoustic guitar nylon": 24,
  "acoustic guitar steel": 25,
  "electric guitar jazz": 26,
  "electric guitar clean": 27,
  "electric guitar muted": 28,
  "overdriven guitar": 29,
  "distortion guitar": 30,
  "guitar harmonics": 31,
  "acoustic bass": 32,
  "electric bass finger": 33,
  "electric bass pick": 34,
  "fretless bass": 35,
  "slap bass": 36,
  "synth bass": 38,
  violin: 40,
  viola: 41,
  cello: 42,
  contrabass: 43,
  "tremolo strings": 44,
  "pizzicato strings": 45,
  "orchestral harp": 46,
  timpani: 47,
  "string ensemble": 48,
  "synth strings": 50,
  "choir aahs": 52,
  "voice oohs": 53,
  "synth voice": 54,
  "orchestra hit": 55,
  trumpet: 56,
  trombone: 57,
  tuba: 58,
  "muted trumpet": 59,
  "french horn": 60,
  "brass section": 61,
  "synthbrass 1": 62,
  "synthbrass 2": 63,
  "soprano sax": 64,
  "alto sax": 65,
  "tenor sax": 66,
  "baritone sax": 67,
  oboe: 68,
  "english horn": 69,
  bassoon: 70,
  clarinet: 71,
  piccolo: 72,
  flute: 73,
  recorder: 74,
  "pan flute": 75,
  "blown bottle": 76,
  shakuhachi: 77,
  whistle: 78,
  ocarina: 79,
  "lead 1 square": 80,
  "lead 2 sawtooth": 81,
  "lead 3 calliope": 82,
  "lead 4 chiff": 83,
  "lead 5 charang": 84,
  "lead 6 voice": 85,
  "lead 7 fifths": 86,
  "lead 8 bass lead": 87,
  "pad 1 new age": 88,
  "pad 2 warm": 89,
  "pad 3 polysynth": 90,
  "pad 4 choir": 91,
  "pad 5 bowed": 92,
  "pad 6 metallic": 93,
  "pad 7 halo": 94,
  "pad 8 sweep": 95,
  "fx 1 rain": 96,
  "fx 2 soundtrack": 97,
  "fx 3 crystal": 98,
  "fx 4 atmosphere": 99,
  "fx 5 brightness": 100,
  "fx 6 goblins": 101,
  "fx 7 echoes": 102,
  "fx 8 scifi": 103,
  sitar: 104,
  banjo: 105,
  shamisen: 106,
  koto: 107,
  kalimba: 108,
  "bag pipe": 109,
  fiddle: 110,
  shanai: 111,
  "tinkle bell": 112,
  agogo: 113,
  "steel drums": 114,
  woodblock: 115,
  "taiko drum": 116,
  "melodic tom": 117,
  "synth drum": 118,
  "reverse cymbal": 119,
  "guitar fret noise": 120,
  "breath noise": 121,
  seashore: 122,
  "bird tweet": 123,
  "telephone ring": 124,
  helicopter: 125,
  applause: 126,
  gunshot: 127,
};

export const Drums = ["drums", "drum"];

export const MonophonicOrNot = {
  melody: true,
  monophonic: true,
  polyphonic: false,
  chords: false,
  chord: false,
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
