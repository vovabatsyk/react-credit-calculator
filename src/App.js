import React from 'react'
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate
} from 'react-router-dom'

import { BankPage } from './pages/BankPage'
import { CreditPage } from './pages/CreditPage'
import { BankInfo } from './pages/BankInfo'
import { LayoutComponent } from './components/LayoutComponent'
import { EditBankPage } from './pages/EditBankPage'
import { AddBankPage } from './pages/AddBankPage'

function App() {
	return (
		<LayoutComponent>
			<BrowserRouter>
				<Routes>
					<Route path='/banks'>
						<Route index element={<BankPage />} />
						<Route path=':id' element={<BankInfo />} />
						<Route path='edit/:id' element={<EditBankPage />} />
						<Route path='add' element={<AddBankPage />} />
					</Route>
					<Route path='credits' element={<CreditPage />} />
					<Route
						path='*'
						element={<Navigate to='/banks' replace />}
					/>
				</Routes>
			</BrowserRouter>
		</LayoutComponent>
	)
}

export default App
