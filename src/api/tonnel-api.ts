import { readData } from "../data-manager";
import { getFloorRequestOptinons } from "../requests/floor-request-options";
import { getLatestSaleRequestOptions } from "../requests/latest-sale-request-options";

export class TonnelApi {
  constructor() {}
  getFloor(): Promise<any> {
    const data = readData();
    return new Promise((resolve, reject) => {
      fetch(data.floorRequestUrl, getFloorRequestOptinons(data))
        .then((response) =>
          response
            .json()
            .then((jsonData) => resolve(jsonData[0]))
            .catch((error) => reject(`${error.toString()} in TonnelApi`))
        )
        .catch((error) => reject(`${error.toString()} in TonnelApi`));
    });
  }
  getLatestSale(): Promise<any> {
    const data = readData();
    return new Promise((resolve, reject) => {
      fetch(data.latestRequestUrl, getLatestSaleRequestOptions(data))
        .then((response) => {
          response
            .json()
            .then((jsonData) => resolve(jsonData[0]))
            .catch((error) => reject(`${error.toString} in TonnelApi`));
        })
        .catch((error) => reject(`${error.toString} in TonnelApi`));
    });
  }
}
