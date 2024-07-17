import { ApiResponse } from "@/types/ApiResponse";
import { read_invoice_by_date } from "@/db/crud/inventory/purchases/invoices/read";

export async function date_filter(data: any): Promise<ApiResponse> {
	try {

		const invoice_date: string | null = data['invoice_date'];

		// Default Invalid Checker
		if ( invoice_date == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Sections
		const result = await read_invoice_by_date({
			invoice_date
		});

		return {
			returncode: 200,
			message: "Invoices Fetched",
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
