import { ApiResponse } from "@/types/ApiResponse";
import { read_category } from "@/db/crud/menus/category/read";
import { create_menu_category } from "@/db/crud/menus/category/create";

export async function add_menu_category(data: any): Promise<ApiResponse> {
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
		const existingCategoryName = await read_category({ category_name, hotel_id });
		if ( existingCategoryName.returncode != 400 ) {
			return existingCategoryName;
		}

		// Inserting the Section
		const result = await create_menu_category({
			category_name,
			description,
			hotel_id
		});

		return {
			returncode: 200,
			message: "Menu Category Added",
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
