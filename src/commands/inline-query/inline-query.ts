import { Context, NarrowedContext } from "telegraf";
import { TonnelApi } from "../../api/tonnel-api";
import {
  InlineQueryResult,
  Update,
} from "telegraf/typings/core/types/typegram";
import { latestSaleInlineQueryObject } from "./inlineQueryObjects/latestSale";
import { floorInlineQueryObject } from "./inlineQueryObjects/floor";

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
      ctx.answerInlineQuery(inline);
    });
  });
};
