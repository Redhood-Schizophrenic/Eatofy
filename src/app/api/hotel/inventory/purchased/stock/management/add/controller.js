import { create_purchase_stock } from "@/db/crud/inventory/purchases/stock/create";
import { add_available_stock } from "../../../../available_stock/management/add/controller";
import { check_available_stock } from "@/db/crud/inventory/available_stock/read";
import { request } from "http";

export async function add_purchase_stock(data) {
	try {

		const invoice_id = data['invoice_id'] || null;
		const hotel_id = data['hotel_id'] || null;
		const item_id = data['item_id'] || null;
		const quantity = data['quantity'] || null;
		const unit = data['unit'] || null;
		const per_price = data['per_price'] || null;
		const total_price = data['total_price'] || null;

		// Default Invalid Checker
		if (invoice_id == null || item_id == null || quantity == null || unit == null || per_price == null || total_price == null) {
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

		if (result.returncode == 200) {
			const check = await check_available_stock({
				item_id,
				hotel_id
			});

			const existing_quantity = parseInt(check.output[0].Quantity);
			const total_quantity = `${ existing_quantity + parseInt(quantity) }`;

			const request_var = {
				item_id,
				'quantity': total_quantity,
				unit,
				hotel_id
			};

			const stock_automation = await add_available_stock(request_var);

			if (stock_automation.returncode === 200) {

				return {
					returncode: 200,
					message: "Purchase Order Added",
					output: result.output
				};
			}
			else {
				return {
					returncode: 500,
					message: "Purchase Order Added but not added to stock.",
					output: result.output
				};
			}
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
