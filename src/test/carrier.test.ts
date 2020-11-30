// api reference:: https://jestjs.io/docs/en/api

import IContract from "contract";
import Contract from "../contract";

const contract: IContract = new Contract();


// creates a block that groups together several related tests
describe('Example Test for Github Actions', () => {	

	test('getCarrierInformation: EXPECT REJECT', async () => {	
		const action = async () =>{
			await contract.getCarrierInformation('FailedID');
		}
		const err = new Error('400: Network Error');
		await expect(action).rejects.toEqual(err);
	})	

});



