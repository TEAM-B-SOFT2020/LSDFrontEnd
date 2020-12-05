// api reference:: https://jestjs.io/docs/en/api

import IContract from "contract";
import Contract from "../contract/ContractRPC";
import IAirportDetail from "contract/src/DTO/IAirportDetail";
const contract: IContract = new Contract();
// creates a block that groups together several related tests
describe('AIRPORT TESTT', () => {
	// runs the test
	test('getAirportInformation : EXPECT PASS', async () => {
		let result = await contract.getAirportInformation('CPH');
		const expected: IAirportDetail = {iata: 'CPH', name: 'Copenhagen Airport', timeZone:'Europe/Copenhagen'} ;
		expect(result).toEqual(expected);
	});
});