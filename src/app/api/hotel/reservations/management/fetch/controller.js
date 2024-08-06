import { read_reservations } from "@/db/crud/reservations/read";

export async function fetch_reservations(data) {
	try {

		const hotel_id = data['hotel_id'] || null;

		// Default Invalid Checker
		if ( hotel_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Sections
		const result = await read_reservations({
			hotel_id,
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
