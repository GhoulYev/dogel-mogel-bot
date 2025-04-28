import { appendFileSync } from "fs";

export const showLog = (log: string): void => {
  const logDate: Date = new Date();
  const logString: string = `[${logDate.toTimeString()}]: ${log}`;
  console.log(logString);
  appendFileSync("log.txt", `${logString}\n`);
};
