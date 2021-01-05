module.exports = {
  branches: [
    "master"
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
        pkgRoot: "."
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
        pkgRoot: "dist"
      },
    ],
    {
      assets: ["package.json", "CHANGELOG.md", "package-lock.json"],
      message: "chore(release): ${nextRelease.version} [ci skip] ${nextRelease.notes}",
      path: "@semantic-release/git",
    },
    "@semantic-release/github"
  ],
};
