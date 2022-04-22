import {
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export const banksApi = createApi({
	reducerPath: 'banksApi',
	tagTypes: ['Banks', 'Bank'],
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
	endpoints: build => ({
		getBanks: build.query({
			query: () => 'banks',
			providesTags: ['Banks', 'Bank']
		}),
		addBank: build.mutation({
			query: body => ({
				url: 'banks',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Banks']
		}),
		editBank: build.mutation({
			query: ({ id, ...body }) => ({
				url: `banks/${id}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: ['Bank']
		}),
		deleteBank: build.mutation({
			query: id => ({
				url: `banks/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Banks']
		}),
		getBank: build.query({
			query: id => `banks/${id}`,
			providesTags: ['Bank']
		})
	})
})

export const {
	useGetBanksQuery,
	useAddBankMutation,
	useDeleteBankMutation,
	useGetBankQuery,
	useEditBankMutation
} = banksApi
