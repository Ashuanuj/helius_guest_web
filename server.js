const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const express = require('express');
const config = require('./webpack.config');
const debug = require('debug');
// const cors = require('cors');
const app = express();
const compiler = webpack(config);
// const debugHttp = debug('app:http');
app.use('/public', express.static('public'))
const debugError = debug('app:error');
// app.use(cors({
//      'allowedHeaders': ['sessionId', 'Content-Type'],
//      'exposedHeaders': ['sessionId'],
//      'origin': '*',
//      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//      'preflightContinue': false
//    }));

app.use(historyApiFallback({
     verbose: false,
}));

if (process.env.NODE_ENV === 'production')
{
     app.use(express.static('dist'));
}
else
{
     app.use(devMiddleware(compiler, {
          noInfo: true,
          publicPath: '/',
          stats: {
               colors: true,
               chunks: false,
          },
     }));
     app.use(hotMiddleware(compiler));
}

const server = app.listen(3000, (err) => {
     const HOST =server.address().address;//'192.168.0.78';
     const PORT = server.address().port;
     console.log('Listening at http://%s:%s', HOST, PORT);


     if (err)
     {
          debugError(err);
          return;
     }

     console.log('Listening at http://%s:%s', HOST, PORT);
});

/* eslint no-console:0 */
