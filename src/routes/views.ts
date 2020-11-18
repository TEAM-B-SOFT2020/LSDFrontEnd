// libraries
import * as express from 'express';

// classes, interfaces & functions


const router: express.Router = express.Router();

router.get('/', async (req, res) => {
	// stephan syntax:: just a complex way to make a simple list
    const items: string[] = [...Array(20)].map((_, index) => `List item ${index + 1}`);
    const numbers: number = 1
	const content: object = { title: 'Hello TypeScript RPC', items, numbers};
	res.render('index', content);
});

export default router;