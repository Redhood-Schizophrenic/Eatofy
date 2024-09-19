import { kot_display } from "@/db/crud/orders/management/read";

export async function fetch_kot_bill(data) {
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
		const result = await kot_display({
			hotel_id
		});

		if ( result.returncode == 200 ) {
			return {
				returncode: 200,
				message: "Kot orders Fetched",
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
