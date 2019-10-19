module.exports = {
  branches: [
    "master"
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/npm", { npmPublish: false }],
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
        pkgRoot: "package",
      },
    ],
    {
      assets: ["package.json", "CHANGELOG.md"],
      message:
        "chore(release): ${nextRelease.version} [skip ci]nn${nextRelease.notes}",
      path: "@semantic-release/github",
    },
  ],
};
