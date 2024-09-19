import { read_customers } from "@/db/crud/customers/management/read";

export async function fetch_customers(data) {
	try {

		const hotel_id = data['hotel_id'];

		// Default Invalid Checker
		if ( hotel_id == null || hotel_id == undefined || hotel_id == "" ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Sections
		const result = await read_customers({
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
