import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetBankQuery } from '../redux/banksApi'
import { Card, Button } from 'antd'
import {
	AppstoreAddOutlined,
	CalculatorOutlined
} from '@ant-design/icons'
import { COLORS, SIZES } from '../styles/theme'

export const BankInfo = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { data: bank, isLoading, isSuccess } = useGetBankQuery(id)

	return (
		<Card
			title='Банківські установи'
			style={{
				height: '90%',
				width: '90%',
				boxShadow: SIZES.boxShadow
			}}
			extra={[
				<Button
					type='text'
					icon={<AppstoreAddOutlined />}
					style={{ color: COLORS.success }}
					key='add'
				>
					Додати банк
				</Button>,
				<Button
					type='text'
					icon={<CalculatorOutlined />}
					style={{ color: COLORS.primary }}
					key='calculate'
				>
					До розрахунків
				</Button>
			]}
		>
			{isLoading ? (
				<h2>loading...</h2>
			) : (
				<>
					<h1>Name: {bank.name}</h1>
					<h2>Rate: {bank.rate}</h2>
				</>
			)}
			<button onClick={() => navigate('/banks')}>to Banks</button>
		</Card>
	)
}
