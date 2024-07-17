import { ApiResponse } from "@/types/ApiResponse";
import { check_item } from "@/db/crud/inventory/items/read";
import { create_item } from "@/db/crud/inventory/items/create";

export async function add_item(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];
		const category_id: string | null = data['category_id'];
		const description: string | null = data['description'];
		const item_name: string | null = data['item_name'];

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

		return {
			returncode: 200,
			message: "Item Added",
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
