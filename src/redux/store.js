import { configureStore } from '@reduxjs/toolkit'
import { banksApi } from './banksApi'

export const store = configureStore({
	reducer: {
		[banksApi.reducerPath]: banksApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(banksApi.middleware)
})
