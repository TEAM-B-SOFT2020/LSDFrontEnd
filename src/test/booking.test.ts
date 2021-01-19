// api reference:: https://jestjs.io/docs/en/api

import IContract from "contract";
import Contract from "../contract";
import IPassengerIdentifier from "contract/src/IPassengerIdentifier";
const contract: IContract = new Contract();
// creates a block that groups together several related tests
describe('Success Scenario', () => {
	// runs the test
	test('Get booking in database by PNR', async () => {
		const pnr: string = "B1BS34"
		const passengerIdentifier: IPassengerIdentifier = { pnr }
		const expectedPrice: number = 1020;
		
		let result = await contract.getBooking(passengerIdentifier);
			 expect(result.price).toBe(expectedPrice)
	});
});
