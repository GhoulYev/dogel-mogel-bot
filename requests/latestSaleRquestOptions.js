import fs from "fs";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  authData: JSON.parse(fs.readFileSync("./data.json")).auth,
  page: 1,
  limit: 1,
  type: "SALE",
  filter: {
    gift_name: "Easter Egg",
    model: "Dogel Mogel (1%)",
  },
  sort: {
    timestamp: -1,
    gift_id: -1,
  },
});

export const requestUrl = "https://gifts2.tonnel.network/api/saleHistory";

export const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};
