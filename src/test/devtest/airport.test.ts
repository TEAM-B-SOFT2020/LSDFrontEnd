// api reference:: https://jestjs.io/docs/en/api

import IContract from "contract";
import Contract from "../..//contract";
import IAirportDetail from "contract/src/DTO/IAirportDetail";
import { ConsoleWriter } from "istanbul-lib-report";

const contract: IContract = new Contract();


// creates a block that groups together several related tests
describe('getAirportInformation: EXPECT SUCCESS', () => {
	// runs the test
	test('True should be truthy', async () => {
		let result = await contract.getAirportInformation('CPH');
		const expected: IAirportDetail = {iata: 'CPH', name: 'Copenhagen Airport', timeZone:'Europe/Copenhagen'} ;
		expect(result).toEqual(expected);
	});
});