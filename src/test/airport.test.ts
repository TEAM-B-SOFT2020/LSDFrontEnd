// api reference:: https://jestjs.io/docs/en/api

import IContract from "contract";
import Contract from "../contract";
import IAirportDetail from "contract/src/DTO/IAirportDetail";
const contract: IContract = new Contract();
// creates a block that groups together several related tests
describe("Success scenarios", () => {
    test("Should return IAirportDetail from iata", async () => {
        //arrange
        const iata: string = "CPH";
        const name: string = "Copenhagen Airport"
        const timeZone: string = "Europe/Copenhagen"
        const expected: IAirportDetail = { iata, name, timeZone }

        //act
        const actual: IAirportDetail = await contract.getAirportInformation(iata)

        //assert
        expect(actual).toEqual(expected);
    })
})