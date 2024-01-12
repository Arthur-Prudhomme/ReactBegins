import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articleAPI = createApi({
    reducerPath: 'articleAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://iim.etherial.fr/' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `products`,
        })
    }),
})

export const { useGetProductsQuery } = articleAPI