import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-access-token":
    "coinrankingc1c59b148f46d0d192853a6a8af5e9e624b2a01f8839df86",
};

// const baseUrl = "https://api.coinranking.com/v2/coins";
const baseUrl = "https://api.coinranking.com/v2";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins/?limit=${count}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest("/coin/${coinId}/history/${timeperiod}"),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
