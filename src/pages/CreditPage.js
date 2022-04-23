import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetBanksQuery } from '../redux/banksApi'
import { COLORS, SIZES } from '../styles/theme'
import { Scrollbars } from 'react-custom-scrollbars'
import { RollbackOutlined } from '@ant-design/icons'
import {
	Card,
	Button,
	Select,
	Skeleton,
	InputNumber,
	Col,
	Typography,
	Row,
	List,
	Avatar,
	message
} from 'antd'
import { calculatePayment } from '../utils/calculatePayment'

export const CreditPage = () => {
	const { Option } = Select
	const { Text } = Typography

	const {
		data: banks = [],
		isLoading: isBanksLoading,
		isError: isFetchBanksError
	} = useGetBanksQuery()
	const navigate = useNavigate()

	const [initialLoan, setInitialLoan] = useState('')
	const [bank, setBank] = useState({})
	const [downPayment, setDownPayment] = useState('')
	const [resultSum, setResultSum] = useState(0)
	const [everyMonth, setEveryMonth] = useState()
	const [showCalc, setShowCalc] = useState(false)
	const [showDescBank, setShowDescBank] = useState(false)

	const getSelectedBank = id => {
		const selectedBank = banks.find(b => b.id === id)
		return selectedBank
	}

	const handleChange = id => {
		const b = getSelectedBank(id)
		setBank(b)
		setShowDescBank(true)
	}

	const handleCalc = () => {
		if (bank) {
			if (
				Number(initialLoan) > Number(bank.max) ||
				initialLoan <= 0
			) {
				message.error(
					'Введіть суму не більшу за максимальну суму банку!'
				)
			} else {
				setShowCalc(true)
				let variable = initialLoan - downPayment
				let em = calculatePayment(variable, bank.rate, bank.term)
				setEveryMonth(Math.ceil(em))
				let sum = em * bank.term + downPayment
				setResultSum(Math.ceil(sum))
			}
		} else {
			alert('Select bank')
		}
	}

	useEffect(() => {
		if (bank) {
			setDownPayment(initialLoan * (bank.min / 100))
		}
	}, [bank, initialLoan])

	return (
		<Card
			style={{
				height: '90%',
				width: '90%',
				boxShadow: SIZES.boxShadow
			}}
			extra={[
				<Button
					type='text'
					icon={<RollbackOutlined />}
					style={{ color: COLORS.secondary }}
					key='back'
					onClick={() => {
						navigate('/banks')
					}}
				>
					Назад
				</Button>
			]}
		>
			{isBanksLoading ? (
				<Skeleton active />
			) : (
				<Scrollbars
					style={{
						height: '100%',
						minWidth: 320,
						paddingRight: SIZES.padding
					}}
				>
					{showDescBank ? (
						<List size='small' bordered>
							<List.Item>
								<List.Item.Meta
									avatar={<Avatar src={bank.avatar} />}
									title={`${bank.name} Процентна ставка: ${bank.rate}% Максимальна сума позики: ${bank.max}UAH`}
									description={` Мінімальна сума першого внеску: ${bank.min}% Термін: ${bank.term}міс.`}
								/>
							</List.Item>
						</List>
					) : (
						<></>
					)}
					<Row justify='center' align='middle'>
						<Col style={{ margin: SIZES.margin }}>
							<Select
								defaultValue='Виберіть банк'
								style={{ width: 300 }}
								onChange={handleChange}
							>
								{banks &&
									banks.map(bank => (
										<Option key={bank.id} value={bank.id}>
											{bank.name}
										</Option>
									))}
							</Select>
						</Col>
						<Col style={{ margin: SIZES.margin }}>
							<Text>Сума позики UAH</Text>
							<InputNumber
								min={1}
								style={{ minWidth: 300 }}
								value={initialLoan}
								onChange={value => setInitialLoan(value)}
							/>
						</Col>
						<Col style={{ margin: SIZES.margin }}>
							<Button type='primary' onClick={handleCalc}>
								Розрахувати
							</Button>
						</Col>
					</Row>
					{showCalc && (
						<Row justify='center'>
							<Card
								size='small'
								title='Результат'
								style={{ width: 300 }}
							>
								<p>Щомісячний платіж {everyMonth}UAH</p>
								<p>Остаточна сума {resultSum}UAH</p>
								<p>Термін {bank.term}міс.</p>
							</Card>
						</Row>
					)}
				</Scrollbars>
			)}
		</Card>
	)
}
