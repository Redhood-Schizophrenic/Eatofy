import { read_subscriptions } from "@/db/crud/subscriptions/management/read";

export async function fetch_subscriptions() {
	try {

		// Getting the Subscriptions
		const result = await read_subscriptions ();

		return {
			returncode: 200,
			message: "Subscriptions Fetched",
			output: result.output
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
