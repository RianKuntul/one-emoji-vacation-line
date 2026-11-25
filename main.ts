// One Emoji, One Dream Vacation — entry program.
//
// The whole entry is a single emoji. This program keeps that emoji in one
// place, writes it (and nothing else) to entry.txt, then reads the file
// back and re-checks it against both the competition gate and the brief
// itself — exactly one emoji — before exiting, so a bad edit fails loudly
// here instead of being scored as invalid or weak later.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The pick: a desert island — one tiny island, one palm, ringed by water.
//
// Why this one, over a lone palm tree or a beach umbrella: those are
// props from a holiday, this is the holiday itself. A stranger sees a
// whole place in a single glance, the way a postcard works — sand, sea
// and nobody else around. It is also a specific dream rather than any
// trip: not "a beach somewhere" but the castaway fantasy of an island
// that is yours alone for a week. It renders clearly at small sizes and
// needs no cultural context to read.
//
// Note the emoji is two code points (U+1F3DD plus the U+FE0F variation
// selector that asks for its colour presentation) but one grapheme
// cluster and one emoji — the checks below keep those ideas separate.
const ENTRY = "🏝️";

// Gate from the kit: UTF-8 text of 1 to 8 characters, not only whitespace.
// "Characters" are counted as Unicode code points ([...text]), which is
// how a multi-byte emoji should be measured — not UTF-16 code units and
// not raw bytes.
const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 8;

function codePointCount(text: string): number {
  return [...text].length;
}

// How many user-perceived characters (grapheme clusters) the text has.
// "🏝️" is one cluster even though it is two code points, while "🏝️🌴"
// would be two — and the brief allows exactly one emoji.
function graphemeCount(text: string): number {
  const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
  return [...segmenter.segment(text)].length;
}

function assertInsideGate(text: string): void {
  const count = codePointCount(text);
  if (count < MIN_CODE_POINTS || count > MAX_CODE_POINTS) {
    throw new Error(
      `entry is ${count} code point(s); gate allows ${MIN_CODE_POINTS}-${MAX_CODE_POINTS}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace; gate rejects it");
  }
}

function assertExactlyOneEmoji(text: string): void {
  if (graphemeCount(text) !== 1) {
    throw new Error(
      `entry must be exactly one emoji; it has ${graphemeCount(text)} grapheme cluster(s)`,
    );
  }
}

function assertValidEntry(text: string): void {
  assertInsideGate(text);
  assertExactlyOneEmoji(text);
}

function main(): void {
  assertValidEntry(ENTRY);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  const outFile = join(outDir, "entry.txt");
  writeFileSync(outFile, ENTRY, "utf8");

  // Read back what actually landed on disk and validate that, not just
  // the in-memory string: encoding or write surprises are caught here.
  const written = readFileSync(outFile, "utf8");
  if (written !== ENTRY) {
    throw new Error(`entry.txt mismatch: wrote ${ENTRY}, read ${written}`);
  }
  assertValidEntry(written);
}

main();
