import { ApiResponse } from "@/types/ApiResponse";
import { create_purchase_stock } from "@/db/crud/inventory/purchases/stock/create"; 

export async function add_purchase_stock(data: any): Promise<ApiResponse> {
	try {

		const invoice_id: string | null = data['invoice_id'];
		const item_id: string | null = data['item_id'];
		const quantity: string | null = data['quantity'];
		const unit: string | null = data['unit'];

		// Default Invalid Checker
		if ( invoice_id == null || item_id == null || quantity == null || unit == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}

		// Add Items Purchased Stock 
		const result = await create_purchase_stock({
			invoice_id,
			item_id,
			quantity,
			unit
		});

		return {
			returncode: 200,
			message: "Purchase Order Added",
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
