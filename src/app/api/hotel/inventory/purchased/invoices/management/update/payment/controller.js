import { update_payment } from "@/db/crud/inventory/purchases/invoices/update";

export async function update_invoice(data) {
	try {

		const invoice_id = data['invoice_id'] || null;
		const payment_status = data['payment_status'] || null;
		const payment_mode = data['payment_mode'] || null;
		const balance_amount = data['balance_amount'] || 0;
		
		// Default Invalid Checker
		if ( invoice_id == null || payment_mode == null || payment_status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Details
		const result = await update_payment({
			invoice_id,
			payment_mode,
			payment_status,
			balance_amount
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
