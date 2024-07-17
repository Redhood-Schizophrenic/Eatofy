import { update_expense } from "@/db/crud/expenses/management/update";
import { ApiResponse } from "@/types/ApiResponse";

export async function update_expense_details(data: any): Promise<ApiResponse> {
	try {

		const expense_id: string | null = data['expense_id'];
		const date: string | null = data['date'];
		const amount_paid: number | null = data['amount_paid'];
		const amount_payable: number | null = data['amount_payable'];
		const note: string | null = data['note'];
		const status: string | null = data['status'];

		// Default Invalid Checker
		if ( expense_id == null || date == null || amount_paid == null || amount_payable == null || status == null ) {
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
			status
		});

		return {
			returncode: 200,
			message: "Details Updated",
			output: result.output
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
