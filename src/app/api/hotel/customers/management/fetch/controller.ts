import { ApiResponse } from "@/types/ApiResponse";
import { read_customers } from "@/db/crud/customers/management/read";

export async function fetch_customers(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];

		// Default Invalid Checker
		if ( hotel_id == null ) {
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

		return {
			returncode: 200,
			message: "Customers Fetched",
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
