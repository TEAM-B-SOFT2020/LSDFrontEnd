// libraries
import * as express from 'express';


import IBookingIdentifier from 'contract/src/IBookingIdentifier';


import IContract from 'contract';
import Contract from "../../contract/ContractMock";

//Makes a mock of the ContractMock called mock
const contract: IContract = new Contract();

// classes, interfaces & functions
const router: express.Router = express.Router();

/*
router.get('/', async (req, res) => {  
    // uses the mock to get carrier information
    const bookingId: IBookingIdentifier = { id: 'test' };    
    const booking = await contract.getBooking(bookingId);
    //create a new object that contains the object carrier
    const content: object = { booking };    
    //Return the content to the carriers view
	res.render('booking', content);
});
*/

router.post('/', async (req, res) => {  
    const body: any = req.body;
    console.table(body);

    const bookingId: IBookingIdentifier = { id: 'test' };    
    const booking = await contract.getBooking(bookingId);
    //create a new object that contains the object carrier
  
    const content: object = { data: 'data', booking };    
    //Return the content to the carriers view
	res.render('booking', content);
});

export default router;