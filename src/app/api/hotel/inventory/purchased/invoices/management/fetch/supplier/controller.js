import { read_invoice_by_supplier } from "@/db/crud/inventory/purchases/invoices/read";

export async function supplier_filter(data) {
	try {

		const supplier_id = data['supplier_id'] || null;

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

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
