// libraries
import express from 'express/';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// routes
import views from './routes/pages/views';
import flights from './routes/pages/flights';
import carriers from './routes/pages/carriers';
import booking from './routes/pages/booking';
import flightapi from './routes/api/flightapi';
import api from './routes/api/api';

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


app.use('/api', api);
app.use('/api/flights', flightapi);

// static scripts, styles, images etc. configuration
app.use(express.static('src/static'));

// initiating server
app.listen(port, () => {
	console.log('Server running...');
	console.table({ 'EJS Views': `http://localhost:${port}`, 'REST API': `http://localhost:${port}/api/` });
});