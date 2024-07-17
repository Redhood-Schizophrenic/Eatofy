import { ApiResponse } from "@/types/ApiResponse";
import { create_customer_occassion } from "@/db/crud/customers/occasions/create";

export async function add_occassion(data: any): Promise<ApiResponse> {
	try {

		const customer_id: string | null = data['customer_id'];
		const occassion: string | null = data['occassion'];
		const date: string | null = data['date'];

		// Default Invalid Checker
		if (customer_id == null || occassion == null || date == null) {
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
		})

		return {
			returncode: 200,
			message: "Customer's Occassion Added",
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
