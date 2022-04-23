import React from 'react'
import {
	useGetBanksQuery,
	useDeleteBankMutation
} from '../redux/banksApi'
import { useNavigate } from 'react-router-dom'
import {
	Button,
	Card,
	Popconfirm,
	List,
	Avatar,
	Skeleton,
	Alert,
	message
} from 'antd'
import { COLORS, SIZES } from '../styles/theme'
import { Scrollbars } from 'react-custom-scrollbars'
import {
	InfoCircleOutlined,
	DeleteOutlined,
	EditOutlined,
	AppstoreAddOutlined,
	CalculatorOutlined
} from '@ant-design/icons'

export const BankPage = () => {
	const navigate = useNavigate()

	const {
		data: banks = [],
		isLoading: isBanksLoading,
		isError: isFetchBanksError
	} = useGetBanksQuery()
	const [
		deleteBank,
		{
			isSuccess: isDeleteSuccess,
			isError: isDeleteError,
			error: errorDeleteMessage
		}
	] = useDeleteBankMutation()

	const handleDeleteBank = async id => {
		await deleteBank(id).unwrap()
		if (isDeleteSuccess) message.success('Видалено успішно!')
		if (isDeleteError) message.error(errorDeleteMessage.message)
	}

	return (
		<>
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
						onClick={() => navigate(`/banks/add`)}
					>
						Додати банк
					</Button>,
					<Button
						type='text'
						icon={<CalculatorOutlined />}
						style={{ color: COLORS.primary }}
						key='calculate'
						onClick={() => navigate(`/credits`)}
					>
						До розрахунків
					</Button>
				]}
			>
				{isFetchBanksError ? (
					<Alert
						message='Помилка на сервері!'
						description='Не вдалося загрузити список банків'
						type='error'
					/>
				) : isBanksLoading ? (
					<Skeleton active />
				) : (
					<Scrollbars
						style={{
							height: '100%',
							minWidth: 320,
							paddingRight: SIZES.padding
						}}
					>
						<List
							dataSource={banks}
							itemLayout='horizontal'
							renderItem={bank => (
								<>
									<List.Item
										actions={[
											<Button
												type='text'
												style={{ color: COLORS.primary }}
												icon={<InfoCircleOutlined />}
												key='info'
												onClick={() => navigate(`/banks/${bank.id}`)}
											/>,
											<Button
												type='text'
												style={{ color: COLORS.secondary }}
												icon={<EditOutlined />}
												key='edit'
												onClick={() =>
													navigate(`/banks/edit/${bank.id}`)
												}
											/>,
											<Popconfirm
												title='Ви впевнені？'
												okText='Так'
												cancelText='Ні'
												placement='left'
												onConfirm={() => handleDeleteBank(bank.id)}
											>
												<Button
													type='text'
													style={{ color: COLORS.danger }}
													icon={<DeleteOutlined />}
													key='delete'
												/>
											</Popconfirm>
										]}
									>
										<List.Item.Meta
											avatar={
												<Avatar
													size='large'
													shape='square'
													src={
														bank.avatar
															? bank.avatar
															: 'https://cdn-icons-png.flaticon.com/512/124/124486.png'
													}
													onError={() => <InfoCircleOutlined />}
												/>
											}
											title={bank.name}
											description={`Процентна ставка: ${bank.rate}%`}
										></List.Item.Meta>
									</List.Item>
								</>
							)}
						></List>
					</Scrollbars>
				)}
			</Card>
		</>
	)
}

// 			{/* <Button
// 				onClick={() => navigate('/credits')}
// 				style={{
// 					backgroundColor: COLORS.primary,
// 					color: COLORS.white
// 				}}
// 			>
// 				to Credit
// 			</Button>
// 			<ul>
// 				{banks.map(bank => (
// 					<li key={bank.id}>
// 						{bank.name}{' '}
// 						<button onClick={() => handleDeleteBank(bank.id)}>
// 							Delete
// 						</button>
// 						<button onClick={() => navigate(`/banks/${bank.id}`)}>
// 							to Bank Info
// 						</button>
// 					</li>
// 				))}
// 			</ul>
// 			<input
// 				type='text'
// 				placeholder='name'
// 				value={name}
// 				onChange={e => setName(e.target.value)}
// 			/>
// 			<input
// 				type='number'
// 				step='0.01'
// 				placeholder='rate'
// 				value={rate}
// 				onChange={e => setRate(e.target.value)}
// 			/>
// 			<input
// 				type='number'
// 				min={1}
// 				max={10000}
// 				placeholder='max'
// 				value={max}
// 				onChange={e => setMax(e.target.value)}
// 			/>
// 			<input
// 				type='number'
// 				min={1}
// 				max={10000}
// 				placeholder='min'
// 				value={min}
// 				onChange={e => setMin(e.target.value)}
// 			/>
// 			<input
// 				type='number'
// 				min={1}
// 				max={36}
// 				placeholder='term'
// 				value={term}
// 				onChange={e => setTerm(e.target.value)}
// 			/>
// 			<button onClick={handleAddBank}>Add</button>
// 			{isError && (
// 				<h2 style={{ backgroundColor: 'red' }}>{error.message}</h2>
// 			)}
// 			<ul>
// 				<li>name: {name}</li>
// 				<li>rate: {rate}</li>
// 				<li>max: {max}</li>
// 				<li>min: {min}</li>
// 				<li>term: {term}</li>
// 			</ul> */}

// // "name": "PrivatBank",
// //     "rate": "4.8",
// //     "max": "3000",
// //     "min": "20",
// //     "term": "12"
