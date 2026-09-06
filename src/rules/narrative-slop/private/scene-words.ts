import data from "../data/scene-words.json" with { type: "json" };

export const sceneWords = {
  knownNouns: new Set<string>(data.knownNouns.split(" ")),
  actors: new Set<string>(data.actors.split(" ")),
  body: new Set<string>(data.body.split(" ")),
  concrete: new Set<string>(data.concrete.split(" ")),
  physical: new Set<string>(data.physical.split(" ")),
  animate: new Set<string>(data.animate.split(" ")),
  transitive: new Set<string>(data.transitive.split(" ")),
  counting: new Set<string>(data.counting.split(" ")),
  change: new Set<string>(data.change.split(" ")),
  vocal: new Set<string>(data.vocal.split(" ")),
  gesture: new Set<string>(data.gesture.split(" "))
};
