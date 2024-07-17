import { ApiResponse } from "@/types/ApiResponse";
import { read_order } from "@/db/crud/orders/management/read"; 

export async function fetch_single_order(data: any): Promise<ApiResponse> {
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

		// Getting the Orders
		const result = await read_order({
			order_id
		});

		return {
			returncode: 200,
			message: "Order Fetched",
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
