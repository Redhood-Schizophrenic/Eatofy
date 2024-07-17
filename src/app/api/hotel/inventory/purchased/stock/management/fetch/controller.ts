import { ApiResponse } from "@/types/ApiResponse";
import { read_purchased_stock } from "@/db/crud/inventory/purchases/stock/read";

export async function fetch_purchased_stock(data: any): Promise<ApiResponse> {
	try {

		const invoice_id: string | null = data['invoice_id'];

		// Default Invalid Checker
		if ( invoice_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Sections
		const result = await read_purchased_stock({
			invoice_id
		});

		return {
			returncode: 200,
			message: "Invoice's Stock Fetched",
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
