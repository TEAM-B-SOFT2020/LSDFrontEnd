// api reference:: https://jestjs.io/docs/en/api

import IContract from "contract";
import Contract from "../contract/ContractMock";
import IAirportDetail from "contract/src/DTO/IAirportDetail";

const contract: IContract = new Contract();


// creates a block that groups together several related tests
describe('getAirportInformation: EXPECT SUCCESS', () => {
	// runs the test
	test('True should be truthy', async () => {
		let result = await contract.getAirportInformation('lol');
		const expected: IAirportDetail = {iata: 'lol', name: 'lolland', timeZone:'GMT+1'} ;	
		expect(expected).toEqual(result);
	});
});