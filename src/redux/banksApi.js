import {
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export const banksApi = createApi({
	reducerPath: 'banksApi',
	tagTypes: ['Banks'],
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
	endpoints: build => ({
		getBanks: build.query({
			query: () => 'banks',
			providesTags: result =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Banks', id })),
							'Banks'
					  ]
					: ['Banks']
		}),
		addBank: build.mutation({
			query: body => ({
				url: 'banks',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Banks']
		}),
		deleteBank: build.mutation({
			query: id => ({
				url: `banks/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Banks']
		}),
		getBank: build.query({
			query: id => `banks/${id}`
		})
	})
})

export const {
	useGetBanksQuery,
	useAddBankMutation,
	useDeleteBankMutation,
	useGetBankQuery
} = banksApi
