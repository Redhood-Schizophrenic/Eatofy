import { read_all_subscriptions, read_hotel_subscription } from "@/db/crud/hotel_subscription/management/read";

export async function fetch_hotel_subscriptions() {
	try {

		// Getting the Subscriptions
		const result = await read_all_subscriptions();

		if (result.output.length == 0) {
			return {
				returncode: 400,
				message: "Subscriptions doesn't exists",
				output: result.output
			};

		}

		if (result.returncode == 200) {

			return {
				returncode: 200,
				message: "Subscriptions Fetched",
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

export async function fetch_hotel_subscription(data) {
	try {

		const hotel_id = data['hotel_id'];

		if (hotel_id == null || hotel_id == undefined || hotel_id == "") {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Subscriptions
		const result = await read_hotel_subscription({ hotel_id });

		if (result.output.length == 0) {
			return {
				returncode: 400,
				message: "Subscriptions doesn't exists",
				output: result.output
			};

		}

		if (result.returncode == 200) {

			return {
				returncode: 200,
				message: "Subscriptions Fetched",
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

