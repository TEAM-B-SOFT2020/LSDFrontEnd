// libraries
import express from 'express/';
import path from 'path';
import dotenv from 'dotenv';

const promMid = require('express-prometheus-middleware');

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

app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  // How often prometheus should collect the metrics
  interval: 60 * 1000,  
  // Any routes that should be ignored
  excludeRoutes: [],  
  // Percentiles for request duration summary
  requestDurationBuckets: [0.5, 0.9, 0.95, 0.99],  
  // Time buckets for request duration histogram
  requestDurationHistogramBuckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],  
  // Size buckets for request
  requestSizeBuckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],  
  // Size buckets for response
  responseSizeBuckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
 }));
 

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