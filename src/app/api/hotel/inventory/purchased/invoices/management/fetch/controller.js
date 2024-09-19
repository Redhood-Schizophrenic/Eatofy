import { read_invoices } from "@/db/crud/inventory/purchases/invoices/read";

export async function fetch_invoices(data) {
	try {

		const hotel_id = data['hotel_id'] || null;

		// Default Invalid Checker
		if ( hotel_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Sections
		const result = await read_invoices({
			hotel_id
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
