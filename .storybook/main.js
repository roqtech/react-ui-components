const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  staticDirs: ["../public", "../static"],
  resolve: {
    alias: {
      styles: path.join(__dirname, "..", "src", "styles"),
    },
  },
  features: {
    previewMdx2: true, // 👈 MDX 2 enabled here
  },
  webpackFinal: async (config, { configType }) => {
    config.plugins.push(new NodePolyfillPlugin());

    return config;
  },
};
