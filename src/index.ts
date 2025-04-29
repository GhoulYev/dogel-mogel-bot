import { Telegraf } from "telegraf";
import { readData, writeData } from "./data-manager";
import { showLog } from "./logging/logging";
import { getFloorString, sendFloor } from "./commands/send-floor";
import {
  getLatestSaleString,
  sendLatestSale,
} from "./commands/send-latest-sale";
import { initIntervals } from "./intervals/init";
import { TonnelApi } from "./api/tonnel-api";
import { InlineQueryResult } from "telegraf/typings/core/types/typegram";
import { inlineQueryHandler } from "./commands/inline-query/inline-query";

const data: IData = readData();

const app: Telegraf = new Telegraf(data.TELEGRAM_TOKEN);
const tonnel: TonnelApi = new TonnelApi();

const registerChat = (chatId: number): void => {
  if (!data.chatsId.includes(chatId) && chatId < 0) {
    data.chatsId.push(chatId);
    writeData(data);
    showLog("Added new chat for sending Notifications");
  }
};

app.command("floor", (ctx) => {
  registerChat(ctx.chat.id);
  sendFloor(ctx.chat.id, app, data, tonnel);
});

app.command("latest", (ctx) => {
  registerChat(ctx.chat.id);
  sendLatestSale(ctx.chat.id, app, data, tonnel);
});

app.on("inline_query", (ctx) => {
  inlineQueryHandler(tonnel, ctx);
});

app.launch(() => {
  showLog("Bot launch");
  initIntervals(app, tonnel);
});
