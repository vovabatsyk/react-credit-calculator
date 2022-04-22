import {
	Skeleton,
	Card,
	Button,
	Typography,
	Form,
	message,
	Input,
	Image
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	useGetBankQuery,
	useEditBankMutation
} from '../redux/banksApi'
import Icon, {
	RollbackOutlined,
	EditOutlined
} from '@ant-design/icons'
import { COLORS, SIZES } from '../styles/theme'
import { Scrollbars } from 'react-custom-scrollbars'

export const EditBankPage = () => {
	const { Title } = Typography

	const navigate = useNavigate()
	const { id } = useParams()

	const { data: bank, isLoading } = useGetBankQuery(id)

	const [updateBank] = useEditBankMutation()

	const [form] = Form.useForm()

	const [name, setName] = useState('')
	const [avatar, setAvatar] = useState('')
	const [description, setDescription] = useState('')
	const [rate, setRate] = useState(0)
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(0)
	const [term, setTerm] = useState(0)

	const fetchData = async () => {
		await setName(bank.name)
		await setDescription(bank.description)
		await setAvatar(bank.avatar)
		await setRate(bank.rate)
		await setMax(bank.max)
		await setMin(bank.min)
		await setTerm(bank.term)
	}

	useEffect(() => {
		fetchData()
	}, [!isLoading])

	const onFinish = async () => {
		await updateBank({
			id,
			name,
			description,
			avatar,
			rate,
			max,
			min,
			term
		})
		clearForm()
		message.success('Змінено успішно!')
		navigate('/banks')
	}

	const onFinishFailed = errorInfo => {
		message.error(errorInfo)
	}

	const clearForm = () => {
		setName('')
		setDescription('')
		setAvatar('')
		setRate(0)
		setMax(0)
		setMin(0)
		setTerm(0)
		form.resetFields()
	}

	return (
		<Card
			title={
				<Title level={4} style={{ color: COLORS.warning }}>
					<Icon component={EditOutlined} /> Редагувати
				</Title>
			}
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
						clearForm()
						navigate('/banks')
					}}
				>
					Назад
				</Button>
			]}
		>
			{isLoading ? (
				<Skeleton active />
			) : (
				<Scrollbars
					style={{
						height: '100%',
						minWidth: 320,
						paddingRight: SIZES.padding
					}}
				>
					<Form
						name='basic'
						form={form}
						labelCol={{
							span: 8
						}}
						wrapperCol={{
							span: 16
						}}
						initialValues={{
							name: bank.name,
							description: bank.description,
							avatar: bank.avatar,
							max: bank.max,
							min: bank.min,
							rate: bank.rate,
							term: bank.term
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
					>
						<Form.Item
							label='Назва'
							name='name'
							rules={[
								{
									required: true,
									message: 'Назва є обовязковим полем!'
								}
							]}
						>
							<Input
								value={name}
								onChange={e => setName(e.target.value)}
								placeholder={name}
							/>
						</Form.Item>
						<Form.Item label='Логотип URL' name='avatar'>
							<Input
								value={avatar}
								onChange={e => setAvatar(e.target.value)}
							/>
						</Form.Item>
						<Form.Item label='Логотип' name='avatar'>
							<Image
								src={avatar}
								width={50}
								style={{ marginLeft: SIZES.margin }}
							/>
						</Form.Item>

						<Form.Item label='Опис' name='description'>
							<Input.TextArea
								maxLength={200}
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							label='Рейтинг'
							name='rate'
							rules={[
								{
									required: true,
									message: 'Рейтинг є обовязковим полем!'
								}
							]}
						>
							<Input
								type='number'
								step={0.1}
								min={1}
								max={10}
								value={rate}
								onChange={e => setRate(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							label='Максимум'
							name='max'
							rules={[
								{
									required: true,
									message: 'Максимум є обовязковим полем!'
								}
							]}
						>
							<Input
								type='number'
								min={1}
								value={max}
								onChange={e => setMax(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							label='Мінімум'
							name='min'
							rules={[
								{
									required: true,
									message: 'Мінімум є обовязковим полем!'
								}
							]}
						>
							<Input
								type='number'
								min={1}
								value={min}
								onChange={e => setMin(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							label='Термін'
							name='term'
							rules={[
								{
									required: true,
									message: 'Термін є обовязковим полем!'
								}
							]}
						>
							<Input
								type='number'
								min={1}
								max={24}
								value={term}
								onChange={e => setTerm(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16
							}}
						>
							<Button
								type='primary'
								style={{ backgroundColor: COLORS.success }}
								htmlType='submit'
								loading={isLoading}
							>
								Зберегти
							</Button>
						</Form.Item>
					</Form>
				</Scrollbars>
			)}
		</Card>
	)
}
