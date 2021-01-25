import { sequences } from "@magenta/music/es6";

export function getChunks(quantizedMels) {
  // Encode the input into MusicVAE, get back a z.
  // Split this sequence into 32 bar chunks.
  let chunks = [];
  quantizedMels.forEach((m) => {
    const melChunks = sequences.split(sequences.clone(m), 16 * 2);
    chunks = chunks.concat(melChunks);
  });
  return chunks;
}

export function trimSilence(ns) {
  for (let i = 0; i < ns.length; i++) {
    const notes = ns[i].notes.sort((n1, n2) => n1.startTime - n2.startTime);
    const silence = notes[0].startTime;
    for (let j = 0; j < ns[i].notes.length; j++) {
      ns[i].notes[j].startTime -= silence;
      ns[i].notes[j].endTime -= silence;
    }
  }
}
