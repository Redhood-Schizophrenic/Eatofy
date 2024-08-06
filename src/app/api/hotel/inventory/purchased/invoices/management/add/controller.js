import { create_invoice } from "@/db/crud/inventory/purchases/invoices/create";

export async function add_invoice(data) {
	try {

		const invoice_no  = data['invoice_no'] || null;
		const payment_mode = data['payment_mode'] || null;
		const total_amount = data['total_amount'] || null;
		const balance_amount = data['balance_amount'] || null;
		const payment_status = data['payment_status'] || null;
		const supplier_id = data['supplier_id'] || null;
		const hotel_id = data['hotel_id'] || null;
		const invoice_date = data['invoice_date'] || null;
		
		// Default Invalid Checker
		if ( total_amount == null || payment_status == null || balance_amount == null || payment_status == null || supplier_id == null || hotel_id == null || invoice_date == null || invoice_no == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Inserting the Purchase Order
		const result = await create_invoice({
			invoice_no,
			payment_mode,
			total_amount,
			balance_amount,
			payment_status,
			supplier_id,
			hotel_id,
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
