const path = require('path');
const srcPath = path.join(__dirname, '/../app');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[local]___[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                /* eslint-disable global-require */
                require('postcss-simple-vars')({
                  variables: () => {
                    return require(srcPath + '/theme.js');
                  },
                }),
                require('postcss-nested'),
                require('postcss-cssnext'),
              ],
            },
          },
        ],
        include: path.resolve(__dirname, '../app'),
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
};
