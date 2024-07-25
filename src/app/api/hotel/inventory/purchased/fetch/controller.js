import { read_invoices } from "@/db/crud/inventory/purchases/invoices/read";
import { read_suppliers } from "@/db/crud/inventory/suppliers/read";
import { read_items } from "@/db/crud/inventory/items/read";

export async function fetch_invoices_web_data(data) {
	try {

		const hotel_id = data['hotel_id'];

		// Default Invalid Checker
		if ( hotel_id == null || hotel_id == undefined || hotel_id == "" ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Invoices
		const invoices_result = await read_invoices({
			hotel_id
		});
		if ( invoices_result.returncode != 200 && invoices_result.output.length == 0 ) {
			return invoices_result;
		}

		// Getting the Suppliers
		const suppliers_result = await read_suppliers({
			hotel_id
		});
		if ( suppliers_result.returncode != 200 && suppliers_result.output.length == 0 ) {
			return invoices_result;
		}

		// Getting the Items
		const items_result = await read_items({
			hotel_id
		});
		if ( items_result.returncode != 200 && items_result.output.length == 0 ) {
			return items_result;
		}

		return {
			returncode: 200,
			message: "Hotel's Invoices Fetched",
			output: [{
				Suppliers: suppliers_result.output,
				Items: items_result.output,
				Invoices: invoices_result.output,

			}]
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
