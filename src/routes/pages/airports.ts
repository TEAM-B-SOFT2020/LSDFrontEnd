// libraries
import * as express from 'express';
import IContract from 'contract';
import Contract from "../../contract/ContractMock";


const contract: IContract = new Contract();

// classes, interfaces & functions
const router: express.Router = express.Router();

router.get('/', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list
    //Makes a mock of the ContractMock called mock
    
    // uses the mock to get carrier information
    const airport = await contract.getAirportInformation("*");

    //create a new object that contains the object carrier
    const content: object = { airport };
    
    //Return the content to the carriers view
    res.render('airports', content);
    
});

router.post('/get', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list
    
    //Makes a mock of the ContractMock called mock
    
    // uses the mock to get carrier information
    const airport = await contract.getAirportInformation(req.body.iata);
    
    //create a new object that contains the object carrier
    const content: object = { airport };
    
    //Return the content to the carriers view
	res.render('airports', content);
});








export default router;