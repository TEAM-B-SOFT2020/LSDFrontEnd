// libraries
import * as express from 'express';
import * as contract from 'contract';

import ContractMock from '../../contract/ContractMock';


import IBookingIdentifier from 'contract/src/IBookingIdentifier';




// classes, interfaces & functions
const router: express.Router = express.Router();
router.get('/', async (req, res) => {
    // stephan syntax:: just a complex way to make a simple list    
    //Makes a mock of the ContractMock called mock
    const mock = new ContractMock();
    // uses the mock to get carrier information
    const bookingId: IBookingIdentifier = { id: 'test' };    
    const booking = await mock.getBooking(bookingId);
    //create a new object that contains the object carrier
    const content: object = {title : "Hello from Booking!" , booking };    
    //Return the content to the carriers view
	res.render('booking', content);
});

export default router;