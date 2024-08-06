import { cancelled_orders } from "@/db/crud/orders/cancelled/read";

export async function fetch_cancelled_orders(data) {
	try {

		const hotel_id = data['hotel_id'];

		// Default Invalid Checker
		if ( hotel_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Orders
		const result = await cancelled_orders({
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
