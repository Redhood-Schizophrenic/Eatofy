import { read_expenses } from "@/db/crud/expenses/management/read";
import { ApiResponse } from "@/types/ApiResponse";

export async function fetch_expenses(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];

		// Default Invalid Checker
		if ( hotel_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Expenses
		const result = await read_expenses({
			hotel_id
		});

		return {
			returncode: 200,
			message: "Expenses Fetched",
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
