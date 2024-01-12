import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://iim.etherial.fr/' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `products`,
        }),
        getProductsComments: builder.query({
            query: (id) => `products/${id}/comments`,
        })
    }),
})

export const { useGetProductsQuery, useGetProductsCommentsQuery } = productsAPI