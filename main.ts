// A Day of One-Line Pitches — one sentence that convinces a friend who has
// never coded to let an AI agent build their first app idea on make.fun.
// Writes that single sentence (<= 240 chars) to /output/entry.txt.
//
// The pitch: it speaks to the friend directly, names the one easy action
// (describe the idea in plain words), and ends by flipping the risk —
// the only thing they stand to lose is the idea staying imaginary.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "You've carried that app idea for years — describe it in plain words on make.fun, and an AI agent builds the first version while you watch, so the only thing you risk is finally seeing it exist.";

// The sealed gate counts characters: 1 to 240, not only whitespace.
// Count code points (spread), so an em dash counts as one character.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 240) {
  throw new Error(`entry is ${chars} characters, must be 1-240`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
// One sentence only: a second sentence would split the pitch's single read.
// Count only a mark followed by whitespace or end of text, so the dot
// inside "make.fun" is not mistaken for a sentence end.
const sentenceEnds = (ENTRY.match(/[.!?](?=\s|$)/g) || []).length;
if (sentenceEnds !== 1) {
  throw new Error(`entry has ${sentenceEnds} sentence-ending marks, must be 1`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${chars} chars to /output/entry.txt`);
console.log(ENTRY);
