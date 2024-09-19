import { update_expense } from "@/db/crud/expenses/management/update";

export async function update_expense_details(data) {
	try {

		const expense_id = data['expense_id'] || null;
		const date = data['date'] || null;
		const amount_paid = data['amount_paid'] || null;
		const amount_payable = data['amount_payable'] || null;
		const payment_mode = data['payment_mode'] || null;
		const note = data['note'] || null;
		const status = data['status'] || null;

		// Default Invalid Checker
		if ( expense_id == null || date == null || amount_paid == null || amount_payable == null || status == null || payment_mode == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Details
		const result = await update_expense({
			expense_id,
			date,
			amount_paid,
			amount_payable,
			note,
			status,
			payment_mode
		});

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
