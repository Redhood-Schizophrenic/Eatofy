import { bill_customer_update } from "@/db/crud/bills/management/update";
import { create_customer } from "@/db/crud/customers/management/create";
import { read_customer } from "@/db/crud/customers/management/read";
import { create_customer_occassion } from "@/db/crud/customers/occasions/create";

export async function update_customer_in_bill(data) {
	try {

		const bill_id = data['bill_id'];

		// CRM params
		let customer_name = data['customer_name'];
		let contact = data['contact'];
		const email = data['email'];
		const occassion = data['occassion'];
		const date = data['date'];
		const hotel_id = data['hotel_id'];

		// Default Invalid Checker
		if (bill_id == null || hotel_id == null ||
			bill_id == undefined || hotel_id == undefined ||
			bill_id == "" || hotel_id == "" 
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Customer 
		let customer_id;

		if (customer_name != null && contact != null) {

			// Existing Customer
			const existingCustomer = await read_customer({ customer_name, contact });
			if (existingCustomer.returncode != 200) {

				// Adding the Customer
				const result = await create_customer({
					customer_name,
					contact,
					email,
					hotel_id
				});

				customer_id = result.output.id;
				// If occassion exists
				if (occassion != null && date != null) {
					await create_customer_occassion({
						customer_id: customer_id,
						occassion,
						date
					})
				}
			}
			else {
				customer_id = existingCustomer.output[0].id;
			}
		}
		else {
			customer_id = ""
		}

		// Updating the Customer
		const result = await bill_customer_update({
			bill_id,
			customer_id
		});

		return {
			returncode: 200,
			message: "Bill Customer Updated",
			output: result.output
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
