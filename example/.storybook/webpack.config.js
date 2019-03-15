const path = require('path');

module.exports = ({ config, mode }) => {
  config.resolve.alias["@themestory"] = path.join(
    __dirname,
    "../../src"
  );
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      }
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
