import { bill_customer_update } from "@/db/crud/bills/management/update";
import { create_customer } from "@/db/crud/customers/management/create";
import { read_customer } from "@/db/crud/customers/management/read";
import { create_customer_occassion } from "@/db/crud/customers/occasions/create";
import { ApiResponse } from "@/types/ApiResponse";

export async function update_customer_in_bill(data: any): Promise<ApiResponse> {
	try {

		const bill_id: string | null = data['bill_id'];

		// CRM params
		let customer_name: string | null = data['customer_name'];
		let contact: string | null = data['contact'];
		const email: string | null = data['email'];
		const occassion: string | null = data['occassion'];
		const date: string | null = data['date'];
		const hotel_id: string | null = data['hotel_id'];
		
		// Default Invalid Checker
		if (bill_id == null || hotel_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Customer 
		let customer_id;

		if( customer_name != null && contact != null ) {
		
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

				customer_id = (result.output as { id: string }).id;
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
			output: Array.isArray(result.output) ? result.output : [result.output as any]
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
