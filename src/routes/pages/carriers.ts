// libraries
import * as express from 'express';
import IContract from 'contract';
import Contract from "../../contract";


const contract: IContract = new Contract();

// classes, interfaces & functions
const router: express.Router = express.Router();

router.get('/', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list
    
    //Makes a mock of the ContractMock called mock
    
    let carrier = {};
    // uses the mock to get carrier information
    
    //create a new object that contains the object carrier
    const content: object = { carrier };
    console.log(content)
    
    //Return the content to the carriers view
	res.render('carriers', content);
});

router.post('/', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list
    //Makes a mock of the ContractMock called mock
    
    // uses the mock to get carrier information
    const carrier = await contract.getCarrierInformation(req.body.iata);
    
    //create a new object that contains the object carrier
    const content: object = { carrier };
    console.log(content)
    //Return the content to the carriers view
	res.render('carriers', content);
});



export default router;