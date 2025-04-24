import { showLog } from "../index.js";
import {
  requestOptions,
  requestUrl,
} from "../requests/latestSaleRquestOptions.js";

export const sendLatestSale = (chatId, app) => {
  fetch(requestUrl, requestOptions)
    .then((response) =>
      response.json().then((res) => {
        const gift = res[0];
        const date = new Date(gift.timestamp);
        app.telegram
          .sendMessage(
            chatId,
            `Latest Sale: Dogel Mogel #${gift.gift_num}, Price: ${gift.price} ${
              gift.asset
            }, Time: ${date.getHours()}:${
              date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes()
            }:${
              date.getSeconds() < 10
                ? `0${date.getSeconds()}`
                : date.getSeconds()
            } ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
          )
          .catch((e) => {
            showLog(e.toString());
          });
      })
    )
    .catch((error) => console.error(error));
};
