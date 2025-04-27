import { Telegraf } from "telegraf";
import { getFloorRequestOptinons } from "../requests/floor-request-options";
import { showLog } from "../logging/logging";
import { TonnelApi } from "../api/tonnel-api";

export const getFloorString = (floor: any): string => {
  return `<b>${floor.name} ${
    floor.model
  }</b>\nFloor Price: <b>${floor.price.toFixed(2)} ${
    floor.asset
  }</b>\nMarket Price: <b>${(floor.price + floor.price * 0.1).toFixed(2)} ${
    floor.asset
  }</b>`;
};

export const sendFloor = (
  chatId: number,
  app: Telegraf,
  data: IData,
  tonnel: TonnelApi
): void => {
  tonnel
    .getFloor()
    .then((floor) => {
      app.telegram
        .sendMessage(chatId, getFloorString(floor), {
          parse_mode: "HTML",
        })
        .then(() => {
          showLog(`Sent a message about floor price to chat ${chatId}`);
        })
        .catch((error) => {
          showLog(`${error.toString()} in sendFloor`);
          const index = data.chatsId.indexOf(chatId);
          if (index != -1) {
            data.chatsId.splice(index, 1);
          }
        });
    })
    .catch((error) => {
      `${error.toString()}`;
    });
};
