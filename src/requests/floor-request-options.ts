export const getFloorRequestOptinons = (data: IData): RequestInit => {
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
    user_auth: data.auth,
  });

  return {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
};
