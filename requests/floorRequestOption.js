const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  page: 1,
  limit: 1,
  sort: '{"price":1,"gift_id":-1}',
  filter:
    '{"price":{"$exists":true},"refunded":{"$ne":true},"buyer":{"$exists":false},"export_at":{"$exists":true},"gift_name":"Easter Egg","model":"Dogel Mogel (1%)","asset":"TON"}',
  ref: 0,
  price_range: null,
  user_auth:
    "user=%7B%22id%22%3A5242943211%2C%22first_name%22%3A%22June%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22qothboi%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FeH2QBxn4HDMW8nWiMWMkHWiI6C69WMATy57QJL8BK5iwFeESnqtNml8lAOmQCOod.svg%22%7D&chat_instance=-66283961860620280&chat_type=sender&auth_date=1745431959&signature=7aZnQ_vypsONHgS0xqtuS2SfWCwgGYh68MuEqHPFtmAIbaFTiiOBP_FufaeYx1MJtuWonQui2zgtUx3y55HUDg&hash=755c96f8e86167ae0a08376bf754e00096077f60f8576d3270eaa4de9b56d9a5",
});

export const requestUrl = "https://gifts2.tonnel.network/api/pageGifts";

export const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};
