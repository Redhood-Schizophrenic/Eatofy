import { read_invoice_by_date } from "@/db/crud/inventory/purchases/invoices/read";

export async function date_filter(data) {
	try {

		const invoice_date = data['invoice_date'] || null;

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

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
