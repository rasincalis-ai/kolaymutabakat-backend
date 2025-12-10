import axios from "axios";

export const fetchOrders = async (store, startDate, endDate) => {
  const auth = Buffer.from(store.apikey + ":" + store.apisecret).toString("base64");

  const url = `https://api.trendyol.com/sapigw/suppliers/${store.supplierid}/orders`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent": store.storename,
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    params: {
      page: 0,
      size: 200,
      orderStatus: "Delivered",
      startDate,
      endDate
    }
  });

  return response.data.content || [];
};
