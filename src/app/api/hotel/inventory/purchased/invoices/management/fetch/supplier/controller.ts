import { ApiResponse } from "@/types/ApiResponse";
import { read_invoice_by_supplier } from "@/db/crud/inventory/purchases/invoices/read";

export async function supplier_filter(data: any): Promise<ApiResponse> {
	try {

		const supplier_id: string | null = data['supplier_id'];

		// Default Invalid Checker
		if ( supplier_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Sections
		const result = await read_invoice_by_supplier({
			supplier_id
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
