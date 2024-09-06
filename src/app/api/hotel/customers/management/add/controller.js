import { create_customer } from "@/db/crud/customers/management/create";
import { read_customer } from "@/db/crud/customers/management/read";
import { create_customer_occassion } from "@/db/crud/customers/occasions/create";

export async function add_customer(data) {
	try {

		const customer_name = data['customer_name'];
		const contact = data['contact'];
		const email = data['email'];
		const hotel_id = data['hotel_id'];
		const occassion = data['occassion'];
		const date = data['date'];

		// Default Invalid Checker
		if (hotel_id == null || customer_name == null || contact == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Customer Name
		const existingCustomer = await read_customer({ customer_name, contact });
		if (existingCustomer.returncode == 200) {
			return existingCustomer;
		}

		// Adding the Customer
		const result = await create_customer({
			customer_name,
			contact,
			email,
			hotel_id
		});

		let error_flag = false;
		// If occassion exists
		if (occassion != null && date != null) {
			const occassion_date =  await create_customer_occassion({
				customer_id: result.output.id,
				occassion,
				date
			});
			if (occassion_date.returncode != 200) {
				error_flag = true;
			}
		}

		if (!error_flag) {
			return {
				returncode: 200,
				message: "Customer Added",
				output: result.output
			};
		}
		else {
			return {
				returncode: 400,
				message: "Customer was Added",
				output: []
			};
		}

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
