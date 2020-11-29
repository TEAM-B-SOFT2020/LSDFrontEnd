// libraries
import express from 'express/';
import path from 'path';
import dotenv from 'dotenv';


const http = require('http')
const url = require('url')
const client = require('prom-client')
// Create a Registry which registers the metrics
const register = new client.Registry()
// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'example-nodejs-app'
})
// Enable the collection of default metrics
client.collectDefaultMetrics({ register })
// Create a histogram metric
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
})
// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds)
// Define the HTTP server
const server = http.createServer(async (req: any, res: any) => {
    // Start the timer
  const end = httpRequestDurationMicroseconds.startTimer()
  // Retrieve route from request object
  const route = url.parse(req.url).pathname
  if (route === '/metrics') {
    // Return all metrics the Prometheus exposition format
    res.setHeader('Content-Type', register.contentType)
    res.end(register.metrics())
  }
  // End timer and add labels
  end({ route, code: res.statusCode, method: req.method })
})


dotenv.config();

// routes
import views from './routes/pages/views';
import flights from './routes/pages/flights';
import carriers from './routes/pages/carriers';
import booking from './routes/pages/booking';
import flightapi from './routes/api/flightapi';
import logapi from './routes/api/logapi';
import api from './routes/api/api';
import airports from './routes/pages/airports';

// environments variables -> .env
const port: any = process.env.PORT;
const app: express.Application = express();



// ejs configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// route configuration (if you want a new page with some new data)
app.use('/', views);
app.use('/flights', flights);
app.use('/carriers', carriers);
app.use('/booking', booking);
app.use('/airports', airports);

app.use('/api', api);
app.use('/api/flights', flightapi);
app.use('/api/logs', logapi);

// static scripts, styles, images etc. configuration
app.use(express.static('src/static'));

// initiating server
app.listen(port, () => {
	console.log('Server running...');
	console.table({ 'EJS Views': `http://localhost:${port}`, 'REST API': `http://localhost:${port}/api/` });
});

server.listen(4000)