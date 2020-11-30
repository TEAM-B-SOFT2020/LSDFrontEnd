// api reference:: https://jestjs.io/docs/en/api

import IContract from "contract";
import Contract from "../../contract";
import ICarrierDetail from "contract/src/DTO/ICarrierDetail";

const contract: IContract = new Contract();


// creates a block that groups together several related tests
describe('Example Test for Github Actions', () => {	

	test('getCarrierInformation: EXPECT REJECT', async () => {	
		const action = async () =>{
			await contract.getCarrierInformation('FailedID');
		}
		const err = new Error('422: IATA must be 2 characters long');
		await expect(action).rejects.toEqual(err);
	})

	test('True should be truthy', async () => {
		let result = await contract.getCarrierInformation('SK');
		const expected: ICarrierDetail = {iata : "SK", name : "Scandinavian Airlines"} ;
		expect(result).toEqual(expected);
	});

});



