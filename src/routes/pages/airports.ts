// libraries
import * as express from 'express';
import IContract from 'contract';
import Contract from "../../contract";
import logger from '../../logger';


const contract: IContract = new Contract();

// classes, interfaces & functions
const router: express.Router = express.Router();

router.get('/', async (req, res) => {
    const airport = {};
    const content: object = { airport };
    res.render('airports', content);
    
});

router.post('/get', async (req, res)  => {
    let airport;
    try {
        let iata : String = req.body.iata;
        airport = await contract.getAirportInformation(iata.toUpperCase());
    } finally {
        const content: object = { airport };
        res.render('airports', content);
    }
});

export default router;