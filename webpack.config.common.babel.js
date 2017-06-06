// Для того, чтобы писать кофиг на ES2015 нужно:
//   npm install --save-dev babel-register
//   задать имя файла webpack.config.babel.js
//   использовать отдельный файл для конфигурации babel
// https://github.com/webpack/webpack/issues/1403
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
// Own configurations
import getReactEnvironment from './env';
import paths from './paths';
// \Own configuration


// Get environment variables to inject into our app.
const env = getReactEnvironment();

const commonConfig = ({ cleanPath, outputPath, outputPublicPath }) => ({
  // The home directory for webpack
  // The entry and module.rules.loader option is resolved relative to this directory
  context: paths.context,

  output: {
    path: outputPath,
    publicPath: outputPublicPath,
    pathinfo: true,
    filename: 'js/[name].js',
  },

  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  // devtool: env.ifDevMode('eval-source-map', null),
  // devtool: env.ifDevMode('cheap-module-source-map', null),
  // devtool: env.ifDevMode('eval', null), // https://github.com/commissure/redbox-react#sourcemaps-with-webpack
  devtool: env.ifDevMode('source-map', null), // https://github.com/commissure/redbox-react#sourcemaps-with-webpack

  plugins: [
    // In order for the specified environment variables to be available in the JS code.
    new webpack.EnvironmentPlugin(env.stringified),
    // Keeps hashes consistent between compilations
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Enable HMR globally.
    new webpack.HotModuleReplacementPlugin(),
    // Prints more readable module names in the browser console on HMR updates.
    new webpack.NamedModulesPlugin(),
    // In order for don't emit files if errors occurred.
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    new CleanWebpackPlugin(cleanPath, { root: paths.context }),
  ],
});


export default commonConfig;
