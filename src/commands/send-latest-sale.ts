import { Telegraf } from "telegraf";
import { showLog } from "../logging/logging";
import { getLatestSaleRequestOptions } from "../requests/latest-sale-request-options";
import { TonnelApi } from "../api/tonnel-api";

export const getLatestSaleString = (gift: any): string => {
  const date: Date = new Date(gift.timestamp);
  return `<b>Latest Sale</b>: Dogel Mogel <a href="t.me/nft/EasterEgg-${
    gift.gift_num
  }">#${gift.gift_num}</a>\nPrice: <b>${gift.price.toFixed(2)} ${
    gift.asset
  }</b>\nTime: ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }/${date.getFullYear()} at ${date.getHours()}:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  }:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`;
};

export const sendLatestSale = (
  chatId: number,
  app: Telegraf,
  data: IData,
  tonnel: TonnelApi
): void => {
  tonnel
    .getLatestSale()
    .then((data) => {
      app.telegram
        .sendMessage(chatId, getLatestSaleString(data), {
          parse_mode: "HTML",
        })
        .then(() => {
          showLog(`Sent a message about the last sale to chat ${chatId}`);
        })
        .catch((error) =>
          showLog(`${error.toString} in latestSaleRequestOptions`)
        );
    })
    .catch((error) => {
      `${error.toString}`;
    });
};
