import { create_reservation } from "@/db/crud/reservations/create";
import { read_customer } from "@/db/crud/customers/management/read";
import { ApiHost } from "@/constants/url_consts";


export async function add_customer(data) {
	try {

		const date = data['date'] || null;
		const time = data['time'] || null;
		const customer_name = data['customer_name'] || null;
		const hotel_id = data['hotel_id'] || null;
		const note = data['note'] || null;
		const no_of_persons = data['no_of_persons'] || null;
		const contact = data['contact'] || null;

		// Default Invalid Checker
		if (hotel_id == null || customer_name == null || contact == null || date == null || time == null || no_of_persons == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}


		// Existing Customer Name
		let existingCustomer = await read_customer({ customer_name, contact });

		if (existingCustomer.returncode != 200) {
			const response = await fetch(`${ApiHost}/api/hotel/customers/management/add`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({ customer_name, contact, hotel_id })
			});

			// Check if the response is OK
			if (!response.ok) {
				const errorMsg = await response.json();
				return {
					returncode: response.status,
					message: `Failed to add customer ${customer_name}: ${errorMsg.message}`,
					output: []
				};
			}

			existingCustomer = await response.json();
		}

		let customer_id;
		try {
			// Check if existingCustomer.output is an array or object
			if (Array.isArray(existingCustomer.output)) {
				customer_id = existingCustomer?.output[0]?.id;
			} else {
				customer_id = existingCustomer.output.id;
			}
		} catch (error) {
			return {
				returncode: 500,
				message: "Failed to retrieve customer ID",
				output: []
			};
		}

		// Adding the Reservation
		const result = await create_reservation({
			no_of_persons,
			customer_id,
			date,
			time,
			note,
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
