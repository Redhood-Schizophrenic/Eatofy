import { read_hotel_bills } from "@/db/crud/bills/management/read";

export async function fetch_hotel_bills(data) {
	try {

		const hotel_id = data['hotel_id'];

		// Default Invalid Checker
		if ( hotel_id == null || hotel_id == undefined || hotel_id == "" ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Items
		const result = await read_hotel_bills({
			hotel_id
		});

		if (result.returncode == 200) {
			return {
				returncode: 200,
				message: "Hotel's Bills  Fetched",
				output: result.output
			};
		}

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
