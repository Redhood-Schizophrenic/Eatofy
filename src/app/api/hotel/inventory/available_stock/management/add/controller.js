import { create_available_stock } from "@/db/crud/inventory/available_stock/create";
import { check_available_stock } from "@/db/crud/inventory/available_stock/read";

export async function add_available_stock(data) {
	try {

		const item_id = data['item_id'] || null;
		const quantity = data['quantity'] || null;
		const unit = data['unit'] || null;
		const hotel_id = data['hotel_id'] || null;

		// Default Invalid Checker
		if ( item_id == null || quantity == null || unit == null || hotel_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		const check = await check_available_stock({
			item_id,
			hotel_id
		});

		if ( check.output.length == 0 ) {

			// Inserting the Available Stock
			const result = await create_available_stock({
				item_id,
				quantity,
				unit,
				hotel_id
			});

			return result;
		}
		else {
			return {
				returncode: 500,
				message: "Item Available use Edit",
				output: []
			}
		}

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
