import { InlineQueryResultArticle } from "telegraf/typings/core/types/typegram";
import { getLatestSaleString } from "../../send-latest-sale";

export const latestSaleInlineQueryObject = (
  gift: any
): InlineQueryResultArticle => {
  return {
    type: "article",
    id: "2",
    title: "Latest Sale",
    description: "Displays last sale dogel",
    input_message_content: {
      message_text: getLatestSaleString(gift),
      parse_mode: "HTML",
    },
  };
};
