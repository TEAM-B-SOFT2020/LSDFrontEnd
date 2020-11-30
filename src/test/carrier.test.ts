// api reference:: https://jestjs.io/docs/en/api

import IContract from "contract";
import Contract from "../contract/ContractMock";
import ICarrierDetail from "contract/src/DTO/ICarrierDetail";
const contract: IContract = new Contract();
// creates a block that groups together several related tests
describe('Example Test for Github Actions', () => {	
	test('TEST : GET - SK', async () => {
		let result = await contract.getCarrierInformation('SK');
		const expected: ICarrierDetail = {iata : "SK", name : "Scandinavian Airlines"} ;
		expect(result).toEqual(expected);
	});

});



