export const getLatestSaleRequestOptions = (data: IData): RequestInit => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    authData: data.auth,
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

  return {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
};
