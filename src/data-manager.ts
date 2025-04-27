import { readFileSync, writeFileSync } from "fs";

export const writeData = (data: IData): void => {
  writeFileSync("./data.json", JSON.stringify(data, null, 4), "utf-8");
};

export const readData = (): IData => {
  return JSON.parse(readFileSync("./data.json", "utf-8"));
};
