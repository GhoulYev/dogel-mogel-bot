import { Telegraf } from "telegraf";
import { readData, writeData } from "../../data-manager";
import { showLog } from "../../logging/logging";
import { getLatestSaleRequestOptions } from "../../requests/latest-sale-request-options";
import { TonnelApi } from "../../api/tonnel-api";

const buildNewSaleText = (gift: any, date: Date): string => {
  return `<b>New Sale</b>: Dogel Mogel <a href="t.me/nft/EasterEgg-${
    gift.gift_num
  }">#${gift.gift_num}</a>\nPrice: <b>${gift.price} ${gift.asset}</b>\nTime: ${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  }/${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }/${date.getFullYear()} at ${date.getHours()}:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  }:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`;
};

export const latestSaleSending = (app: Telegraf, tonnel: TonnelApi): void => {
  const data: IData = readData();
  tonnel
    .getLatestSale()
    .then((gift) => {
      const date: Date = new Date(gift.timestamp);
      if (gift.timestamp != data.latestSale.time) {
        data.latestSale.time = gift.timestamp;
        writeData(data);
        if (data.chatsId.length != 0) {
          data.chatsId.forEach((id) => {
            app.telegram
              .sendMessage(id, buildNewSaleText(gift, date), {
                parse_mode: "HTML",
              })
              .then(() => {
                showLog(`Sent a message about the new sale to chat ${id}`);
              })
              .catch((error) => {
                showLog(`${error.toString()} in latestSaleSending`);
                const index = data.chatsId.indexOf(id);
                if (index != -1) {
                  data.chatsId.splice(index, 1);
                }
              });
          });
        }
      }
    })
    .catch((error) => {
      `${error.toString()}`;
    });
};
