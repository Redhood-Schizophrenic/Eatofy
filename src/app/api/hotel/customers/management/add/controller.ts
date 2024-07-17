import { ApiResponse } from "@/types/ApiResponse";
import { create_customer } from "@/db/crud/customers/management/create";
import { read_customer } from "@/db/crud/customers/management/read";
import { create_customer_occassion } from "@/db/crud/customers/occasions/create";

export async function add_customer(data: any): Promise<ApiResponse> {
	try {

		const customer_name: string | null = data['customer_name'];
		const contact: string | null = data['contact'];
		const email: string | null = data['email'];
		const hotel_id: string | null = data['hotel_id'];
		const occassion: string | null = data['occassion'];
		const date: string | null = data['date'];

		// Default Invalid Checker
		if ( hotel_id == null || customer_name == null || contact == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Customer Name
		const existingCustomer = await read_customer({ customer_name, contact });
		if ( existingCustomer.returncode == 200 ) {
			return existingCustomer;
		}

		// Adding the Customer
		const result = await create_customer({
			customer_name,
			contact,
			email,
			hotel_id
		});

		// If occassion exists
		if( occassion != null && date != null ){
			await create_customer_occassion( {
				customer_id: (result.output as { id: string }).id,
				occassion,
				date
			} )
		}

		return {
			returncode: 200,
			message: "Customer Added",
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
