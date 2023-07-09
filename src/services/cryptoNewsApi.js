import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-Api-Key": "1ed4fcb5d29042b38017a69554fb4419",
};

const baseUrl = "https://newsapi.org/v2";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(`/everything?q=${newsCategory}&pageSize=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
