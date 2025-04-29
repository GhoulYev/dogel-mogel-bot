import { InlineQueryResultArticle } from "telegraf/typings/core/types/typegram";
import { getLatestSaleString } from "../../send-latest-sale";

export const latestSaleInlineQueryObject = (
  gift: any
): InlineQueryResultArticle => {
  return {
    type: "article",
    id: "2",
    title: "Displays last sale dogel",
    description: "Sent latest sale ",
    input_message_content: {
      message_text: getLatestSaleString(gift),
      parse_mode: "HTML",
    },
  };
};
