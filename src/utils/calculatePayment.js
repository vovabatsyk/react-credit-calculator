export const calculatePayment = (amount, rate, term) => {
	amount = Number(amount)
	rate = Number(rate)
	term = Number(term)
	return (
		(amount * (rate / 12) * Math.pow(1 + rate / 12, term)) /
		(Math.pow(1 + rate / 12, term) - 1)
	)
}
