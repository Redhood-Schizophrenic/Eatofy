import { create_expense } from "@/db/crud/expenses/management/create";

export async function add_expense(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const expense_name = data['expense_name'] || null;
		const date = data['date'] || null;
		const note = data['note'] || null;
		const payable_to = data['payable_to'] || null;
		const amount_paid = data['amount_paid'] || 0;
		const amount_payable = data['amount_payable'] || 0;
		const status = data['status'] || null;
		const payment_mode = data['payment_mode'] || null;

		// Default Invalid Checker
		if (
			hotel_id == null || expense_name == null || date == null || payable_to == null || amount_payable == null || amount_paid == null || status == null || payment_mode == null
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Inserting the Expense
		const result = await create_expense({
			hotel_id,
			expense_name,
			note,
			date,
			payable_to,
			amount_payable,
			amount_paid,
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
