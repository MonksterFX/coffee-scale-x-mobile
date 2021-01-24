module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
    config.optimization.minimize(false);
    config.mode('development');
  },
};
