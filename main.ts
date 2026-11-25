// Describe Your Ex in One Word — make.fun entry.
// One word, written to /output/entry.txt.
// Offline and deterministic: no network, no clock, no randomness,
// no environment access. The program only emits the word.
import * as fs from "node:fs";

// The verdict: "Recalled" — like a faulty product pulled off the shelves
// by its own maker. One word, instantly readable as a verdict on an ex:
// they turned out defective, so they were sent back. The joke lands at a
// glance, it is not the obvious insult, and anyone who has had an ex that
// turned out broken on arrival recognises it.
const WORD = "Recalled";

// Guard the sealed gate ourselves: 1-111 characters, not only whitespace,
// exactly one word: no internal whitespace and no punctuation tricks.
// Fail loudly instead of ever writing an entry the scorer would reject.
const chars = [...WORD].length;
if (chars < 1 || chars > 111 || !WORD.trim()) {
  throw new Error(`word violates the 1-111 char gate (${chars} chars)`);
}
if (/\s/.test(WORD) || /[^\p{L}]/u.test(WORD)) {
  throw new Error("word must be a single word of letters only");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", WORD, "utf8");

// Verify the written file round-trips exactly at byte level: same bytes,
// one word, no trailing newline (the tie-breaker favours the smaller text,
// so every byte counts).
const written = fs.readFileSync("/output/entry.txt");
const expected = Buffer.from(WORD, "utf8");
if (!written.equals(expected)) {
  throw new Error("entry.txt bytes do not match the word");
}
if (written.length > 111) {
  throw new Error(`entry.txt is ${written.length} bytes, over the 111-byte gate`);
}

console.log(`wrote ${chars} chars to /output/entry.txt`);
