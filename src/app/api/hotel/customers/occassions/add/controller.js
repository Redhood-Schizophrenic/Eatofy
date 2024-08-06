import { create_customer_occassion } from "@/db/crud/customers/occasions/create";

export async function add_occassion(data) {
	try {

		const customer_id = data['customer_id'];
		const occassion = data['occassion'];
		const date = data['date'];

		// Default Invalid Checker
		if (
			customer_id == null || occassion == null || date == null ||
			customer_id == undefined || occassion == undefined || date == undefined ||
			customer_id == "" || occassion == "" || date == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Inserting the Occassion
		const result = await create_customer_occassion({
			customer_id,
			occassion,
			date
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
