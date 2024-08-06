import { update_expense_status } from "@/db/crud/expenses/management/update";

export async function update_status_expense(data) {
	try {

		const expense_id = data['expense_id'] || null;
		const status = data['status'] || null;

		// Default Invalid Checker
		if ( expense_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Expense Status
		const result = await update_expense_status({
			expense_id,
			status
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
