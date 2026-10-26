# Shared Runtime Coverage

- Specular tree requirements cover the runtime, Jev adapter, definitions, packaging and development runner.
- Specular content requirements cover public exports, awaited detection, explicit CLI selection and CI contract execution.
- `scripts/runtime.test.mjs` exercises public textlint results, deterministic/Jev composition, native positions, split requests, suppression, validation, cancellation and HTTP response handling.
- The Specular custom verifier runs those public contracts and returns their pass/fail result; tree and content checks verify module ownership and exports.
- Existing CLI configuration tests verify compatibility from an installed npm artifact. Fixture3 retains deterministic corpus expectations and records the new runtime replay behavior.
- Provider correctness remains measured separately from runtime contracts. A bounded development run compares integrated preparation and paragraph output without exposing holdouts.
