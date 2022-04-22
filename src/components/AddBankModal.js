import React, { useState } from 'react'
import { Modal, Form, Input, Button, Row, Image, message } from 'antd'
import { useAddBankMutation } from '../redux/banksApi'
import { SIZES } from '../styles/theme'

export const AddBankModal = ({
	addModalVisible,
	setAddModalVisible
}) => {
	const [addBank, { isLoading }] = useAddBankMutation()

	const [form] = Form.useForm()

	const [name, setName] = useState('')
	const [avatar, setAvatar] = useState('')
	const [description, setDescription] = useState('')
	const [rate, setRate] = useState(0)
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(0)
	const [term, setTerm] = useState(0)

	const handleCancel = values => {
		clearForm()
		setAddModalVisible(false)
	}
	const onFinish = async () => {
		await addBank({
			name,
			rate,
			max,
			min,
			term,
			description,
			avatar
		}).unwrap()

		clearForm()
		setAddModalVisible(false)
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
		<Modal
			title='Створити банк'
			visible={addModalVisible}
			confirmLoading={isLoading}
			footer={[<></>, <></>]}
			style={{ top: 20 }}
			onCancel={handleCancel}
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
					remember: true
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item
					label='Назва'
					name='bankname'
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
					/>
				</Form.Item>
				<Form.Item label='Логотип URL' name='logoUrl'>
					<Input
						value={avatar}
						onChange={e => setAvatar(e.target.value)}
					/>
				</Form.Item>
				<Form.Item label='Логотип' name='logo'>
					<Image
						src={avatar}
						width={50}
						style={{ marginLeft: SIZES.margin }}
					/>
				</Form.Item>

				<Form.Item label='Опис' name='desc'>
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

				<Row justify='space-around'>
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16
						}}
					>
						<Button
							type='primary'
							htmlType='submit'
							loading={isLoading}
						>
							Зберегти
						</Button>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16
						}}
					>
						<Button type='secondary' onClick={handleCancel}>
							Закрити
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</Modal>
	)
}
