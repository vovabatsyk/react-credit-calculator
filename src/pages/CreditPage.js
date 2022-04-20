import React from 'react'
import { useNavigate } from 'react-router-dom'

export const CreditPage = () => {
	const navigate = useNavigate()

	return (
		<div>
			<h2>CreditPage</h2>
			<button onClick={() => navigate('/banks')}>to Banks</button>
		</div>
	)
}
