//对项目中 wepback 进行自定义配置
const path = require("path");
const WebpackBar = require("webpackbar");
const CracoLessPlugin = require("craco-less"); //单独配置babel无效，需要和craco-less 一起样式才有效果

module.exports = {
  eslint: {
    enable: false,
  },
  babel: {
    plugins: [
      //按需加载antd, style 为 true ,需要配置 craco-less一起才能生效
      ["import", { libraryName: "antd", libraryDirectory: "lib", style: true }],
    ],
  },

  //别名配置
  webpack: {
    alias: {
      "@": path.join(__dirname, "src/"),
    },
    plugins: [new WebpackBar()],
  },

  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
