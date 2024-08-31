import { create_available_stock_report } from "../../../../../../../db/crud/inventory/stock_report/create";
import { check_available_stock_report } from "../../../../../../../db/crud/inventory/stock_report/read";

export async function add_available_stock_report(data) {
	try {

		const item_id = data['item_id'] || null;
		const date = data['date'] || null;
		const quantity = data['quantity'] || null;
		const unit = data['unit'] || null;
		const hotel_id = data['hotel_id'] || null;

		// Default Invalid Checker
		if ( item_id == null || quantity == null || unit == null || hotel_id == null || date == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		const check = await check_available_stock_report({
			hotel_id,
			date
		});

		if ( check.output.length == 0 ) {

			// Inserting the Available Stock
			const result = await create_available_stock_report({
				item_id,
				quantity,
				unit,
				hotel_id,
				date
			});

			return result;
		}
		else {
			return {
				returncode: 500,
				message: "Report Available.",
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
