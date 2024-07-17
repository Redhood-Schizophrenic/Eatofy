import { bill_table_update } from "@/db/crud/bills/management/update";
import { ApiResponse } from "@/types/ApiResponse";

export async function update_table_in_bill(data: any): Promise<ApiResponse> {
	try {

		const bill_id: string | null = data['bill_id'];
		const table_id: string | null = data['hotel_id'];
		
		// Default Invalid Checker
		if (bill_id == null || table_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}
		// Updating the Customer
		const result = await bill_table_update({
			bill_id,
			table_id
		});

		return {
			returncode: 200,
			message: "Bill Table Updated",
			output: Array.isArray(result.output) ? result.output : [result.output as any]
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
