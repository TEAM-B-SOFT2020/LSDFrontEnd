// api reference:: https://jestjs.io/docs/en/api

import IContract from "contract";
import Contract from "../contract/ContractMock";
import ICarrierDetail from 'contract/src/DTO/ICarrierDetail';


const contract: IContract = new Contract();

// creates a block that groups together several related tests
describe('Example Test for Github Actions', () => {
	// runs the test
	test('True should be truthy', async () => {
		let result = await (await contract.getCarrierInformation('SAS140'));
		const expected: ICarrierDetail= {iata: 'SAS140', name: 'SAS'};		
		expect(expected).toEqual(result);
	});
});

