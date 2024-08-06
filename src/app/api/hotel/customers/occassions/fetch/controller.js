import { read_occassion } from "@/db/crud/customers/occasions/read";

export async function fetch_customer_occassions(data) {
	try {

		const customer_id = data['customer_id'];

		// Default Invalid Checker
		if ( customer_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Occassions
		const result = await read_occassion({
			customer_id
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
