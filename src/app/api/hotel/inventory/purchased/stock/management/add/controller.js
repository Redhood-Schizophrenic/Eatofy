import { create_purchase_stock } from "@/db/crud/inventory/purchases/stock/create"; 

export async function add_purchase_stock(data) {
	try {

		const invoice_id = data['invoice_id'] || null;
		const item_id = data['item_id'] || null;
		const quantity = data['quantity'] || null;
		const unit = data['unit'] || null;
		const per_price = data['per_price'] || null;
		const total_price = data['total_price'] || null;

		// Default Invalid Checker
		if ( invoice_id == null || item_id == null || quantity == null || unit == null || per_price == null || total_price == null ) {
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
			unit,
			per_price,
			total_price
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
