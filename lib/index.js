const path = require('path');

module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    context: { paths },
    pluginOptions: { newPath },
  }) => {
    if (!newPath) throw new Error('newPath is required');
    const oldPublicPath = paths.appPublic;
    const oldHtmlPath = paths.appHtml;
    paths.appPublic = path.resolve(newPath);
    paths.appHtml = path.resolve(paths.appPublic, 'index.html');
    if (webpackConfig.plugins) {
      webpackConfig.plugins = replacePathInPluginsOptions(
        webpackConfig.plugins,
        oldPublicPath,
        paths.appPublic
      );
      webpackConfig.plugins = replacePathInPluginsOptions(
        webpackConfig.plugins,
        oldHtmlPath,
        paths.appHtml
      );
    }
    return webpackConfig;
  },
};

function replacePathInPluginsOptions(plugins, search, replace) {
  return plugins.map((plugin) => {
    if (!plugin) return plugin;
    if (plugin.options && typeof plugin.options === 'object') {
      Object.keys(plugin.options).forEach((key) => {
        if (
          typeof plugin.options[key] === 'string' &&
          plugin.options[key] === search
        ) {
          plugin.options[key] = replace;
        }
      });
    }
    return plugin;
  });
}
