import { read_category } from "@/db/crud/menus/category/read";
import { create_menu_category } from "@/db/crud/menus/category/create";

export async function add_menu_category(data) {
	try {

		const hotel_id = data['hotel_id'];
		const category_name = data['category_name'];
		const description = data['description'];

		// Default Invalid Checker
		if (hotel_id == null || category_name == null ||
			hotel_id == undefined || category_name == undefined ||
			hotel_id == "" || category_name == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Category Name
		const existingCategoryName = await read_category({ category_name, hotel_id });
		if (existingCategoryName.returncode != 400) {
			return existingCategoryName;
		}

		// Inserting the Section
		const result = await create_menu_category({
			category_name,
			description,
			hotel_id
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
