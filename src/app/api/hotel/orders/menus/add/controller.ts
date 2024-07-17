import { read_menu_for_order } from "@/db/crud/menus/management/read";
import { create_menu_of_order } from "@/db/crud/orders/management/create";
import { ApiResponse } from "@/types/ApiResponse";

export async function add_menu_order(data: any): Promise<ApiResponse> {
	try {

		const quantity: string | null = data['quantity'];
		const note: string | null = data['note'];
		const menu_id: string | null = data['menu_id'];
		const bill_id: string | null = data['bill_id'];
		const hotel_id: string | null = data['hotel_id'];


		// Default Invalid Checker
		if (quantity == null || menu_id == null || bill_id == null || hotel_id == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Menu Price 
		const existingMenu = await read_menu_for_order({
			menu_id,
		});
		const amount = existingMenu.output[0].Price;
		const menu_quantity = parseFloat(quantity);
		const total_amount = menu_quantity * amount;

		// Inserting the Menu Order
		const result = await create_menu_of_order({
			quantity,
			note,
			total_amount,
			menu_id,
			bill_id,
			hotel_id
		});

		if (result.returncode != 200) {
			return {
				returncode: 200,
				message: "Menu Order Added",
				output: result.output
			};
		}
		else {
			return result;
		}

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
