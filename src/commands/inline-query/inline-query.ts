import { Context, NarrowedContext } from "telegraf";
import { TonnelApi } from "../../api/tonnel-api";
import {
  InlineQueryResult,
  Update,
} from "telegraf/typings/core/types/typegram";
import { latestSaleInlineQueryObject } from "./inlineQueryObjects/latestSale";
import { floorInlineQueryObject } from "./inlineQueryObjects/floor";
import { showLog } from "../../logging/logging";

export const inlineQueryHandler = async (
  tonnel: TonnelApi,
  ctx: NarrowedContext<Context<Update>, Update.InlineQueryUpdate>
): Promise<void> => {
  tonnel.getFloor().then((floor) => {
    tonnel.getLatestSale().then(async (gift) => {
      const inline: InlineQueryResult[] = [
        await latestSaleInlineQueryObject(gift),
        await floorInlineQueryObject(floor),
      ];
      ctx
        .answerInlineQuery(inline)
        .then(() => {
          showLog(`Sent inline message to user ${ctx.from.id}`);
        })
        .catch((error) => showLog(`${error.toString} in Inline`));
    });
  });
};
