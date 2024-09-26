import { check_item_category_name } from "@/db/crud/inventory/items_category/read";
import { create_item_category } from "@/db/crud/inventory/items_category/create";

export async function add_item_category(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const category_name = data['category_name'] || null;
		const description = data['description'] || null;

		// Default Invalid Checker
		if ( hotel_id == null || category_name == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Category Name 
		const existingCategory = await check_item_category_name({ category_name, hotel_id });
		if ( existingCategory.returncode == 200 ) {
			return {
				returncode: 400,
				message: "Category Exists.",
				output: existingCategory.output
			};
		}

		// Inserting the Dish
		const result = await create_item_category({
			category_name,
			hotel_id,
			description
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
