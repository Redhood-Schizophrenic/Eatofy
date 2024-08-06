import { read_invoice_by_payment_status } from "@/db/crud/inventory/purchases/invoices/read";

export async function payment_filter(data) {
	try {

		const payment_status = data['payment_status'] || null;

		// Default Invalid Checker
		if ( payment_status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Sections
		const result = await read_invoice_by_payment_status({
			payment_status
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
