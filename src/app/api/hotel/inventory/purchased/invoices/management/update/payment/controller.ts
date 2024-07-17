import { ApiResponse } from "@/types/ApiResponse";
import { update_payment } from "@/db/crud/inventory/purchases/invoices/update";

export async function update_invoice(data: any): Promise<ApiResponse> {
	try {

		const invoice_id: string | null = data['invoice_id'];
		const payment_status: string | null = data['payment_status'];
		const payment_mode: string | null = data['payment_mode'];
		const balance_amount: number | null = data['balance_amount'];
		
		// Default Invalid Checker
		if ( invoice_id == null || payment_mode == null || payment_status == null || balance_amount == null ) {
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

		return {
			returncode: 200,
			message: "Details Updated",
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
