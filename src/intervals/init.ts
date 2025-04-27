import { Telegraf } from "telegraf";
import { priceSending } from "./intrevals-tasks/floor-sending";
import { latestSaleSending } from "./intrevals-tasks/latest-sale-sending";
import { TonnelApi } from "../api/tonnel-api";

const floorInterval = 1800000;
const latestSaleInterval = 10000;
export const initIntervals = (app: Telegraf, tonnel: TonnelApi): void => {
  setInterval(() => priceSending(app, tonnel), floorInterval);

  setInterval(() => latestSaleSending(app, tonnel), latestSaleInterval);
};
