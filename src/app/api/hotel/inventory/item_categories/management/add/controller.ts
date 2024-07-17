import { ApiResponse } from "@/types/ApiResponse";
import { check_item_category_name } from "@/db/crud/inventory/items_category/read";
import { create_item_category } from "@/db/crud/inventory/items_category/create";

export async function add_item_category(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];
		const category_name: string | null = data['category_name'];
		const description: string | null = data['description'];

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

		return {
			returncode: 200,
			message: "Item Category Added",
			output: result.output
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
