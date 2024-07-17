import { ApiResponse } from "@/types/ApiResponse";
import { read_occassion } from "@/db/crud/customers/occasions/read";

export async function fetch_customer_occassions(data: any): Promise<ApiResponse> {
	try {

		const customer_id: string | null = data['customer_id'];

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

		return {
			returncode: 200,
			message: "Customer Occassions Fetched",
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
