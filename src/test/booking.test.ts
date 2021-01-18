// api reference:: https://jestjs.io/docs/en/api

import IContract from "contract";
import Contract from "../contract";
import IAirportDetail from "contract/src/DTO/IAirportDetail";
import IPassengerIdentifier from "contract/src/IPassengerIdentifier";
import IBookingDetail from "contract/src/DTO/IBookingDetail";
const contract: IContract = new Contract();
// creates a block that groups together several related tests
describe('Success Secnario', () => {
	// runs the test
	test('Booking', async () => {
		const pnr: string = "B1BS34"
		const passengerIdentifier: IPassengerIdentifier = { pnr }
		const expectedPrice: number = 1020;
		
		let result = await contract.getBooking(passengerIdentifier);
			 expect(result.price).toBe(expectedPrice)
	});
});