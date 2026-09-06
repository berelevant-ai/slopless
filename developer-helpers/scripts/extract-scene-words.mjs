import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const [root, output] = process.argv.slice(2);
assert(root && output, "Usage: extract-scene-words.mjs WORDNET_JSON_DIR OUTPUT");
const entries = {}, synsets = {}, categories = {};
for (const file of readdirSync(root).filter((name) => name.endsWith(".json"))) {
  const value = JSON.parse(readFileSync(join(root, file), "utf8"));
  assert(value && typeof value === "object" && !Array.isArray(value));
  if (file.startsWith("entries-")) Object.assign(entries, value);
  else if (/^(noun|verb)\./.test(file)) {
    Object.assign(synsets, value);
    for (const id of Object.keys(value)) categories[id] = file.slice(0, -5);
  }
}
assert(Object.keys(entries).length > 100000, "Incomplete WordNet export");
const vocalRoot = "00985856-v";
const gestureRoots = ["00994073-v", "00925764-v"];
const soundRoots = ["04988388-n", "07124555-n"];
function descends(id, roots, seen = new Set()) {
  if (roots.includes(id)) return true;
  if (seen.has(id)) return false;
  seen.add(id);
  return (synsets[id]?.hypernym ?? []).some((parent) => descends(parent, roots, seen));
}
const result = { actors: [], body: [], concrete: [], physical: [], animate: [], transitive: [], change: [], vocal: [], gesture: [], counting: [] };
const knownNouns = [];
for (const [word, entry] of Object.entries(entries)) {
  if (!/^[a-z]+$/.test(word)) continue;
  const senses = (pos) => Object.entries(entry).filter(([key]) => key === pos || key.startsWith(`${pos}-`)).flatMap(([, value]) => {
    assert(Array.isArray(value.sense));
    for (const sense of value.sense) assert(typeof sense.synset === "string" && categories[sense.synset]);
    return value.sense;
  });
  const nounSense = senses("n")[0]?.synset;
  const noun = categories[nounSense];
  if (noun) knownNouns.push(word);
  const collective = descends(nounSense, ["07958392-n", "07967506-n", "08010371-n"]);
  if (["noun.person", "noun.animal", "noun.body"].includes(noun) || collective) result.actors.push(word);
  if (noun === "noun.body") result.body.push(word);
  if (["noun.person", "noun.animal", "noun.body", "noun.artifact", "noun.object", "noun.substance", "noun.location", "noun.plant", "noun.food", "noun.phenomenon"].includes(noun) || collective || descends(nounSense, soundRoots)) result.concrete.push(word);
  const verbs = senses("v");
  const primary = verbs.slice(0, 2);
  const actionFrames = ["via", "via-pp", "vii", "vii-pp", "vtaa", "vtai", "vtia", "vtii"];
  const physical = primary.filter((sense) => (["verb.contact", "verb.motion", "verb.body", "verb.perception"].includes(categories[sense.synset]) || descends(sense.synset, ["02644022-v", "02647547-v"])) && sense.subcat?.some((frame) => actionFrames.includes(frame)));
  if (physical.length) result.physical.push(word);
  if (physical.some((sense) => sense.subcat?.some((frame) => /^vt/.test(frame))) && !physical.some((sense) => sense.subcat?.some((frame) => /^vi/.test(frame)))) result.transitive.push(word);
  if (physical.some((sense) => sense.subcat?.some((frame) => /^(via|vtaa|vtai)(-|$)/.test(frame))) && !physical.some((sense) => sense.subcat?.some((frame) => /^(vii|vtia|vtii)(-|$)/.test(frame)))) result.animate.push(word);
  if (primary.some((sense) => categories[sense.synset] === "verb.change" && sense.subcat?.some((frame) => ["vtaa", "vtai"].includes(frame)))) result.change.push(word);
  if (verbs.some((sense) => descends(sense.synset, [vocalRoot]))) result.vocal.push(word);
  if (primary.some((sense) => descends(sense.synset, gestureRoots))) result.gesture.push(word);
  if (primary.some((sense) => descends(sense.synset, ["00950103-v"]))) result.counting.push(word);
}
for (const words of Object.values(result)) words.sort();
const encoded = Object.fromEntries(Object.entries(result).map(([key, words]) => [key, words.join(" ")]));
writeFileSync(output, JSON.stringify({ ...encoded, knownNouns: knownNouns.sort().join(" ") }, null, 2) + "\n");
console.log(Object.fromEntries(Object.entries(result).map(([key, words]) => [key, words.length])));
