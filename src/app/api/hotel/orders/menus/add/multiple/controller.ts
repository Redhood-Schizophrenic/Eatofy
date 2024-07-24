import { ApiResponse } from "@/types/ApiResponse";
import { add_menu_order } from "../controller";

interface MenuOrder {
	quantity: string,
	menu_id: string,
	bill_id: string,
	hotel_id: string,
	note: string | null
}

export async function add_menu_orders(data: any): Promise<ApiResponse> {
	try {

		const response_data: Array<MenuOrder> | any | null = data['data'];

		// Default Invalid Checker
		if (response_data == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		response_data.forEach((element: MenuOrder) => {
			try {

				const menu_orders_added = add_menu_order(element);
				if (menu_orders_added.returncode != 200) {
					return {
						returncode: 200,
						message: "Menu Orders Added",
						output: []
					};

				}
			} catch (error) {
				console.error(error);
			}
		});

		return {
			returncode: 200,
			message: "Menu Orders Added",
			output: []
		};
	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
