import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import commonConfig from './webpack.config.common.babel';
import paths from './paths';


const clientConfig = webpackMerge(commonConfig({
  cleanPath: paths.client.output.clean,
  outputPath: paths.client.output.path,
  outputPublicPath: paths.client.output.publicPath,
}), {
  name: 'client',
  target: 'web',

  entry: {
    home: [
      'react-hot-loader/patch',
      './client/src/views/index',
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [paths.client.include.js],
        // cacheDirectory enables caching results in ./node_modules/.cache/babel-loader/ directory for faster rebuilds.
        use: [{ loader: 'babel-loader?cacheDirectory' }],
      },
      {
        test: /\.(ts|tsx)$/,
        include: [paths.shared.path, paths.client.include.js],
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        include: [paths.client.include.css, paths.nodeModules.path],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // Use style-loader when ExtractTextPlugin disabled.
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true, // 'dashes',
                // sourceMap: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        include: paths.client.include.assets,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 1024,
            name: 'assets/[name].[ext]?[hash:base64:5]', // Virtual hash for HRM during development.
          },
        }],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        include: paths.nodeModules.path,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            regExp: 'node_modules(?:/|\\\\)(.*)',
            name: 'lib/[1]?[hash:base64:5]',
          },
        }],
      },
    ],
  },

  plugins: [
    // To extract a common code to single separate file.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common', // Add link to this file in html before other JS files, it has a common code.
      minChunks: 2,
    }),
    // Saves received text to the file, for example css from style-loader and css-loader.
    new ExtractTextPlugin({ filename: 'styles/[name].css', disable: true, allChunks: true }),
    new webpack.LoaderOptionsPlugin({
      options: {
        // In Windows url-loader/file-loader with used regExp makes paths with '\', so replace with '/'.
        customInterpolateName(url, name, options) {
          return url.replace(/\\/g, '/');
        },
      },
    }),
  ],

  resolve: {
    modules: [paths.client.path, paths.nodeModules.path],
    extensions: ['.js', '.jsx', '.json', '.css', '.ts'],
  },

  devServer: {
    // Static content which not processed by webpack and loadable from disk.
    contentBase: paths.devServer.contentBase,
    publicPath: paths.client.output.publicPath,
    historyApiFallback: true, // For react subpages handling with webpack-dev-server
    port: 9000,
    hotOnly: true,
    noInfo: false,
    stats: 'errors-only',
    // stats: {
    //   colors: true,
    //   cached: false, // Add information about cached (not built) modules
    // },
  },
});


export default clientConfig;
