import { read_compliances } from "@/db/crud/compliance/management/read";
import { ApiResponse } from "@/types/ApiResponse";

export async function fetch_compliances(data: any): Promise<ApiResponse> {
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

		// Getting the Compliances
		const result = await read_compliances({
			hotel_id
		});

		return {
			returncode: 200,
			message: "Compliances Fetched",
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
