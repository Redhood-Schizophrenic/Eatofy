import { update_expense_status } from "@/db/crud/expenses/management/update";
import { ApiResponse } from "@/types/ApiResponse";

export async function update_status_expense(data: any): Promise<ApiResponse> {
	try {

		const expense_id: string | null = data['expense_id'];
		const status: string | null = data['status'];

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

		return {
			returncode: 200,
			message: "Status Updated",
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
