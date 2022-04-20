import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetBankQuery } from '../redux/banksApi'
import {
	Card,
	Button,
	Skeleton,
	Typography,
	List,
	Space,
	Avatar,
	Divider
} from 'antd'
import Icon, {
	InfoCircleOutlined,
	RollbackOutlined,
	StarOutlined,
	LikeOutlined,
	MessageOutlined
} from '@ant-design/icons'
import { Scrollbars } from 'react-custom-scrollbars'

import { COLORS, SIZES } from '../styles/theme'

const IconText = ({ icon, text }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
)

export const BankInfo = () => {
	const { Title, Text } = Typography

	const navigate = useNavigate()
	const { id } = useParams()
	const { data: bank, isLoading, isSuccess } = useGetBankQuery(id)

	return (
		<Card
			title={
				<Title level={4} style={{ color: COLORS.primary }}>
					<Icon component={InfoCircleOutlined} /> Деталі
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
					onClick={() => navigate('/banks')}
				>
					Назад
				</Button>
			]}
		>
			{isLoading ? (
				<>
					<Skeleton active />
				</>
			) : (
				<Scrollbars
					style={{
						height: '100%',
						minWidth: 320,
						paddingRight: SIZES.padding
					}}
				>
					<List itemLayout='vertical' size='large'>
						<List.Item
							actions={[
								<IconText
									icon={StarOutlined}
									text={bank.rate}
									key='list-vertical-star-o'
								/>,
								<IconText
									icon={LikeOutlined}
									text='156'
									key='list-vertical-like-o'
								/>,
								<IconText
									icon={MessageOutlined}
									text='2'
									key='list-vertical-message'
								/>
							]}
							extra={<img width={272} alt='logo' src={bank.avatar} />}
						>
							<List.Item.Meta
								avatar={<Avatar src={bank.avatar} />}
								title={bank.name}
								description={bank.description}
							/>

							<Divider orientation='left'>Інфо</Divider>
							<List>
								<List.Item>
									<Typography.Text strong>Рейтинг: </Typography.Text>
									{bank.rate}
								</List.Item>
								<List.Item>
									<Typography.Text strong>
										Максимальна сума:{' '}
									</Typography.Text>
									{bank.max} UAH
								</List.Item>
								<List.Item>
									<Typography.Text strong>
										Мінімальна сума:{' '}
									</Typography.Text>
									{bank.min} UAH
								</List.Item>
								<List.Item>
									<Typography.Text strong>Термін: </Typography.Text>
									{bank.term}{' '}
									{bank.term === '1' ? 'місяць' : 'місяця'}
								</List.Item>
							</List>
						</List.Item>
					</List>
				</Scrollbars>
			)}
		</Card>
	)
}
