const ABSTRACT_POLICY_OBJECTS = new Set([
  "condition",
  "criterion",
  "policy",
  "principle",
  "requirement",
  "rule",
  "standard",
  "threshold"
]);
const DIRECT_OBJECT_DETERMINERS = new Set([
  "a",
  "an",
  "one",
  "that",
  "the",
  "this"
]);
const POLICY_OBJECT_MODIFIERS = new Set([
  "access",
  "approval",
  "business",
  "content",
  "deployment",
  "editorial",
  "governance",
  "launch",
  "operating",
  "pricing",
  "quality",
  "release",
  "review",
  "safety",
  "security",
  "service",
  "spending",
  "technical",
  "testing",
  "usage"
]);

export function hasAbstractPolicyDirectObject(
  tokenWords: readonly string[],
  verbIndex: number
): boolean {
  if (!["set", "sets"].includes(tokenWords[verbIndex] ?? "")) {
    return false;
  }

  const objectTokens = tokenWords.slice(verbIndex + 1);
  const directObject = DIRECT_OBJECT_DETERMINERS.has(objectTokens[0] ?? "")
    ? objectTokens.slice(1)
    : objectTokens;
  const [first, second] = directObject;

  return (
    (directObject.length === 1 && ABSTRACT_POLICY_OBJECTS.has(first ?? "")) ||
    (directObject.length === 2 &&
      POLICY_OBJECT_MODIFIERS.has(first ?? "") &&
      ABSTRACT_POLICY_OBJECTS.has(second ?? ""))
  );
}
