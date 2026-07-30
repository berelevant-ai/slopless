# Release specification coverage

- `package.json`: Specular checks that the package declares `0.2.33` and no longer declares `0.2.32`.
- GitHub Actions, GitHub release state, npm publication, and local installation are verified through their CLIs because they depend on external state.
