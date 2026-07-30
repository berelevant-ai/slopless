# Be Relevant Release Dispatch Spec Coverage

- Goal: release workflow content evidence and an exercised dispatch.
- Approach 1: release workflow content evidence.
- Approach 2: release workflow existing tag validation plus dispatched payload
  inspection.
- Approach 3: repository dispatch endpoint, event type, and payload evidence.
- Approach 4: secret name evidence; secret presence is checked through GitHub.
- Key Decisions: the dispatch follows npm publication in workflow order; manual
  recovery belongs to the receiving repository and is verified there.
- Files To Modify: `.github/workflows/release.yml` is covered directly.

The three extraction passes were isolated sequentially rather than by
independent agents. They produced identical accepted requirements.
