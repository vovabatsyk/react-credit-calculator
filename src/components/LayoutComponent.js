import React from 'react'
import { Layout, Row } from 'antd'
import { COLORS } from '../styles/theme'

export const LayoutComponent = ({ children }) => {
	return (
		<Layout style={{ backgroundColor: COLORS.secondary }}>
			<Layout.Content>
				<Row
					justify='center'
					align='middle'
					style={{ height: '100vh' }}
				>
					{children}
				</Row>
			</Layout.Content>
		</Layout>
	)
}
