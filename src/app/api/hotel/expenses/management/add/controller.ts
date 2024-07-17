import { create_expense } from "@/db/crud/expenses/management/create";
import { ApiResponse } from "@/types/ApiResponse";

export async function add_expense(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];
		const expense_name: string | null = data['expense_name'];
		const date: string | null = data['date'];
		const note: string | null = data['note'];
		const payable_to: string | null = data['payable_to'];
		const amount_payable: number | null = data['amount_payable'];
		const amount_paid: number | null = data['amount_paid'];
		const status: string | null = data['status'];

		// Default Invalid Checker
		if (hotel_id == null || expense_name == null || date == null || note == null || payable_to == null || amount_payable == null || amount_paid == null || status == null) {
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
			status
		});

		return {
			returncode: 200,
			message: "Expense Added",
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
