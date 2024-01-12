import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsAPI } from './Services/API'

export const store = configureStore({
    reducer: {
        [productsAPI.reducerPath]: productsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsAPI.middleware),
})

setupListeners(store.dispatch)