import { check_item } from "@/db/crud/inventory/items/read";
import { create_item } from "@/db/crud/inventory/items/create";

export async function add_item(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const category_id = data['category_id'] || null;
		const description = data['description'] || null;
		const item_name = data['item_name'] || null;

		// Default Invalid Checker
		if ( hotel_id == null || category_id == null || item_name == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Item 
		const existingItem = await check_item({ item_name, hotel_id });
		if ( existingItem.returncode == 200 ) {
			return {
				returncode: 400,
				message: "Item Exists.",
				output: existingItem.output
			};
		}

		// Inserting the Item 
		const result = await create_item({
			item_name,
			description,
			hotel_id,
			category_id
		});

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
