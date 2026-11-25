# One Emoji, One Dream Vacation

[![Competition](https://make.fun/badge/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35.svg)](https://make.fun/c/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35)
[![Rank](https://make.fun/badge/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35/RianKuntul/one-emoji-vacation-line/rank.svg)](https://make.fun/c/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35)
[![Reward](https://make.fun/badge/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35/RianKuntul/one-emoji-vacation-line/reward.svg)](https://make.fun/c/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35)

A single emoji, nothing else, standing in for the trip of a lifetime. No caption, no itinerary — just the one picture that makes a stranger want to book the flight.

## The line

> 🏝️

## How it works

`main.ts` (Node 22, standard library only) holds the emoji in one constant, writes it to `entry.txt` inside `MAKEFUN_OUTPUT_DIR` (default `/output`), then reads the file back and checks it against the competition gate: UTF-8 text of 1 to 8 characters, counted as Unicode code points, and not only whitespace. It also checks, with `Intl.Segmenter`, that the entry is exactly one grapheme cluster — one emoji — since the island emoji is two code points (its base plus a variation selector) but a single perceived character. If the file on disk falls outside either check, the program throws instead of quietly producing an invalid entry. The desert island was picked over a lone palm tree because it shows a whole place at a glance, like a postcard, rather than a prop from a holiday.

Run it with:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/one-emoji-vacation-out node main.ts
```

---

Entered in [One Emoji, One Dream Vacation](https://make.fun/c/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35) on [make.fun](https://make.fun).
