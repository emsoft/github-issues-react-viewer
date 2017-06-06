import path from 'path';

const baseDir = process.cwd();

const paths = {
  context: baseDir,

  nodeModules: {
    dirname: 'node_modules',
    path: path.resolve(baseDir, 'node_modules'),
  },

  client: {
    path: path.resolve(baseDir, 'client'),
    include: {
      js: path.resolve(baseDir, 'client/src'),
      css: path.resolve(baseDir, 'client/src'),
      assets: path.resolve(baseDir, 'client/src/assets'),
    },
    appHtmlTemplate: 'client/src/assets/index.html',
    output: {
      path: path.resolve(baseDir, 'dist/client'),
      publicPath: '/client/',
      clean: path.resolve(baseDir, 'dist/client/*'),
    },
  },

  shared: {
    path: path.resolve(baseDir, 'shared'),
  },

  devServer: {
    contentBase: path.resolve(baseDir, 'client/public'),
  },

  get publicUrl() {
    return this.client.output.publicPath.slice(0, -1);
  },
};

export default paths;
