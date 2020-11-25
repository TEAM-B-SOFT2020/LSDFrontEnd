// api reference:: https://jestjs.io/docs/en/api

import IContract from "contract";
import Contract from "../contract/ContractMock";
import ICarrierDetail from 'contract/src/DTO/ICarrierDetail';
import ContractMock from "../contract/ContractMock";

const contract: IContract = new Contract();

// this is a custom assume test, it only runs when the condition is true

// example:: database population
beforeEach(() => console.log('Running before each'));
// example:: database reset
afterEach(() => console.log('Running after each'));

// example:: database connection or setup
beforeAll(() => {	
		
	
	});
// example:: database disconnection or cleanup
afterAll(() => console.log('Running after all'));

// creates a block that groups together several related tests
describe('Example Test for Github Actions', () => {
	// runs the test
	test('True should be truthy', async () => {
		let result = await (await contract.getCarrierInformation('SAS140'));
		const expected: ICarrierDetail= {iata: 'SAS140', name: 'SAS'};		
		expect(expected).toEqual(result);
	});
});

