import { showLog } from "../index.js";
import { requestOptions, requestUrl } from "../requests/floorRequestOption.js";

export const sendFloor = (chatId, app) => {
  fetch(requestUrl, requestOptions)
    .then((response) =>
      response.json().then((res) => {
        const floor = res[0];
        app.telegram
          .sendMessage(
            chatId,
            `${floor.name} ${floor.model}: Floor Price - ${floor.price} ${
              floor.asset
            }, Market Price - ${floor.price + floor.price * 0.1} ${floor.asset}`
          )
          .catch((e) => {
            showLog(e.toString());
          });
      })
    )
    .catch((error) => console.error(error));
};
