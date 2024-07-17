import { ApiResponse } from "@/types/ApiResponse";
import { update_menu_price } from "@/db/crud/menus/management/update";

export async function update_menu(data: any): Promise<ApiResponse> {
	try {

		const menu_id: string | null = data['menu_id'];
		const price: number | null = data['price'];

		// Default Invalid Checker
		if ( menu_id == null || price == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Price
		const result = await update_menu_price({
			menu_id,
			price
		});

		return {
			returncode: 200,
			message: "Price Updated",
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
