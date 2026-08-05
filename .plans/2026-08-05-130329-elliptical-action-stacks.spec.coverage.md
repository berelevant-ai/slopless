# Elliptical action stack specification coverage

- Goal: Specular checks the private matcher path and its integration into the existing fragment-stack detector.
- Approach: Specular checks the matcher integration and title-abbreviation boundary; Fixture3 verifies detection and reporting behavior.
- Detection boundary: Fixture3 hit and no-hit cases verify the accepted and rejected sentence shapes.
- Fixture coverage: Specular checks representative hit, no-hit, title-abbreviation, and corpus text; Fixture3 verifies all cases.
- Validation: Repository commands and Fixture3 provide runtime evidence.
- Files to modify: Specular checks the new matcher and representative modified fixture files; source control records the complete file set.
