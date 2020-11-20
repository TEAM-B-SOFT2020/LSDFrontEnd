// libraries
import express from 'express/';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// routes
import views from './routes/views';
import api from './routes/api';
import flightapi from './routes/flightapi';
import flights from './routes/flights';

// environments variables -> .env
const port: any = process.env.PORT;
const app: express.Application = express();

// ejs configuration
app.set('views', path.join(__dirname, 'views'));
app.set('flights', path.join("/views", 'flights'));
app.set('view engine', 'ejs');

// route configuration
app.use('/', views);
app.use("/flights", flights)
app.use('/api', api);
app.use('/api/flights', flightapi);

// static scripts, styles, images etc. configuration
app.use(express.static('src/static'));

// initiating server
app.listen(port, () => {
	console.log('Server running...');
	console.table({ 'EJS Views': `http://localhost:${port}`, 'REST API': `http://localhost:${port}/api/` });
});