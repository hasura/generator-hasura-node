import Express from 'express';
import path from 'path';
import PrettyError from 'pretty-error';
import http from 'http';
import morgan from 'morgan';

import config from './config';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

// Express Logging Middleware
if (global.__DEVELOPMENT__)
  app.use(morgan('combined'));
else
  app.use(morgan('[:date[clf]]: :method :url :status :res[content-length] - :response-time ms'));

app.use('/static', Express.static(path.join(__dirname, '..', 'static')));

app.use((req, res) => {
  if (req.originalUrl === '/404') {
    res.status(404).send('Not Found');
    if (global.__DEVELOPMENT__)
      console.error(pretty.render(new Error('Ooh no! /404 asked.')));
  } else {
    res.status(200).send('Works');
  }
});

// Listen at the server
if (config.port) {
  server.listen(config.port, config.host, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server.', config.app.title);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
