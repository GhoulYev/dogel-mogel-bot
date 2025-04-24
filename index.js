import { Telegraf } from "telegraf";
import fs from "fs";
import { sendFloor } from "./commands/sendFloor.js";
import { sendLatestSale } from "./commands/sendLatestSale.js";
import {
  requestOptions,
  requestUrl,
} from "./requests/latestSaleRquestOptions.js";

let data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
const app = new Telegraf(data.TELEGRAM_TOKEN);

export const showLog = (string) => {
  const logDate = new Date();
  console.log(`[${logDate}]: ${string}`);
};

const writeData = () => {
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 4), "utf-8");
};

const registerChat = (chatId) => {
  if (!data.chatsId.includes(chatId) && chatId < 0) {
    data.chatsId.push(chatId);
    writeData();
  }
};

app.command("floor", (ctx) => {
  registerChat(ctx.chat.id);
  sendFloor(ctx.chat.id, app);
});

app.command("latest", (ctx) => {
  registerChat(ctx.chat.id);
  sendLatestSale(ctx.chat.id, app);
});

app.launch(() => {
  showLog("Bot launch");
});

setInterval(() => {
  if (data.chatsId.length != 0) {
    data.chatsId.forEach((id) => {
      sendFloor(id);
    });
  }
}, 1800000);

setInterval(() => {
  fetch(requestUrl, requestOptions).then((response) => {
    response.json().then((req) => {
      const gift = req[0];
      const date = new Date(gift.timestamp);
      if (gift.timestamp != data.latestSale.time) {
        data.latestSale.time = gift.timestamp;
        writeData();
        data.chatsId.forEach((chatId) => {
          app.telegram
            .sendMessage(
              chatId,
              `New Sale: Dogel Mogel #${gift.gift_num}, Price: ${gift.price} ${
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
            .catch((e) => showLog(e.toString()));
        });
      }
    });
  });
}, 10000);
