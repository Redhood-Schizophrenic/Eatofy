import { read_purchased_stock } from "@/db/crud/inventory/purchases/stock/read";

export async function fetch_purchased_stock(data) {
	try {

		const invoice_id = data['invoice_id'] || null;

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

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
