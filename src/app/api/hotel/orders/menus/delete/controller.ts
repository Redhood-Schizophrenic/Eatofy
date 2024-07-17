import { delete_order_menus } from "@/db/crud/orders/management/delete";
import { ApiResponse } from "@/types/ApiResponse";

export async function delete_an_order(data: any): Promise<ApiResponse> {
	try {

		const order_id: string | null = data['order_id'];

		// Default Invalid Checker
		if ( order_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Deleting the Order
		await delete_order_menus({
			order_id
		});

		return {
			returncode: 200,
			message: "Hotel's Order Deleted",
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
