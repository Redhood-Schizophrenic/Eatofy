import { create_available_stock } from "../../../../../../../db/crud/inventory/available_stock/create";
import { check_available_stock } from "../../../../../../../db/crud/inventory/available_stock/read";
import { update_available_quantity } from "../update/quantity/controller";

export async function add_available_stock(data) {
	try {

		const item_id = data['item_id'] || null;
		const quantity = data['quantity'] || null;
		const unit = data['unit'] || null;
		const hotel_id = data['hotel_id'] || null;

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

			const available_stock_id = check.output[0].id;
			const request = {
			    available_stock_id ,
				quantity
			}
			const result = await update_available_quantity(request);
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
