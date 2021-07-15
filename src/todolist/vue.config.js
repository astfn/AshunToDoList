module.exports = {
  publicPath: "./",
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        common: "@/common",
        network: "@/network",
        views: "@/views",
      },
    },
  },
};
