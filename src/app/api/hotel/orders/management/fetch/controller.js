import { read_order } from "@/db/crud/orders/management/read"; 

export async function fetch_single_order(data) {
	try {

		const order_id = data['order_id'] || null;

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

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
