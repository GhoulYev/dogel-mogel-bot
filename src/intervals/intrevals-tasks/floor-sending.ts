import { Telegraf } from "telegraf";
import { sendFloor } from "../../commands/send-floor";
import { readData } from "../../data-manager";
import { TonnelApi } from "../../api/tonnel-api";

export const priceSending = (app: Telegraf, tonnel: TonnelApi): void => {
  const data: IData = readData();
  if (data.chatsId.length != 0) {
    data.chatsId.forEach((id) => {
      sendFloor(id, app, data, tonnel);
    });
  }
};
