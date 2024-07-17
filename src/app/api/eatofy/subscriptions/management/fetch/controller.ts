import { read_subscriptions } from "@/db/crud/subscriptions/management/read";
import { ApiResponse } from "@/types/ApiResponse";

export async function fetch_subscriptions(): Promise<ApiResponse> {
	try {

		// Getting the Subscriptions
		const result = await read_subscriptions ();

		return {
			returncode: 200,
			message: "Subscriptions Fetched",
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
