import { InlineQueryResultArticle } from "telegraf/typings/core/types/typegram";
import { getFloorString } from "../../send-floor";

export const floorInlineQueryObject = (
  floor: any
): InlineQueryResultArticle => {
  return {
    type: "article",
    id: "1",
    title: "Get floor",
    description: "Displays floor price dogel mogel",
    input_message_content: {
      parse_mode: "HTML",
      message_text: getFloorString(floor),
    },
  };
};
