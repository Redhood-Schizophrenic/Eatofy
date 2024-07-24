import { create_purchase_stock } from "@/db/crud/inventory/purchases/stock/create"; 

export async function add_purchase_stock(data) {
	try {

		const invoice_id = data['invoice_id'];
		const item_id = data['item_id'];
		const quantity = data['quantity'];
		const unit = data['unit'];

		// Default Invalid Checker
		if ( invoice_id == null || item_id == null || quantity == null || unit == null ||
			invoice_id == undefined || item_id == undefined || quantity == undefined || unit == undefined ||
			invoice_id == "" || item_id == "" || quantity == "" || unit == ""
		) {
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

		console.log(result);
		if ( result.returncode == 200 ) {

			return {
				returncode: 200,
				message: "Purchase Order Added",
				output: result.output
			};
		}
		else {
			return result;
		}


	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
