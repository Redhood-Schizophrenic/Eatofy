import { ApiResponse } from "@/types/ApiResponse";
import { create_invoice } from "@/db/crud/inventory/purchases/invoices/create";

export async function add_invoice(data: any): Promise<ApiResponse> {
	try {

		const invoice_no : string | null = data['invoice_no']
		const payment_mode: string | null = data['payment_mode'];
		const total_amount: number | null = data['total_amount'];
		const balance_amount: number | null = data['balance_amount'];
		const payment_status: string | null = data['payment_status'];
		const supplier_id: string | null = data['supplier_id'];
		const hotel_id: string | null = data['hotel_id'];
		const invoice_date: string | null = data['invoice_date'];
		
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

		return {
			returncode: 200,
			message: "Purchase Record Added",
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
