// libraries
import * as express from 'express';

//import * as contract from 'contract';


// classes, interfaces & functions
const router: express.Router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', async (req, res) => {
		
	// stephan syntax:: just a complex way to make a simple list
	const content: object = { title: 'Hello TypeScript RPC'};
	res.render('index', content);
});

router.post('/submit-form', async (req, res) => {
	const username = req.body.username;
	console.log(">>>>>>>>>: " + username);
	res.status(204).send()
});
export default router;