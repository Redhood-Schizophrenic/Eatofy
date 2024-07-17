import { create_subscription } from "@/db/crud/subscriptions/management/create";
import { ApiResponse } from "@/types/ApiResponse";
import { read_subscription } from "@/db/crud/subscriptions/management/read";

export async function add_subscription(data: any): Promise<ApiResponse> {
	try {

		const subscription_name: string | null = data['subscription_name'];
		const price: number | null = data['price'];
		const validity: number | null = data['validity'];

		// Default Invalid Checker
		if (subscription_name == null || price == null || validity == null || typeof price === "string" || typeof validity === "string") {

			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Section Name
		const existingSubscriptionName = await read_subscription({ subscription_name });
		if (existingSubscriptionName.returncode != 400) {

			return {
				returncode: 400,
				message: "Subscription Exists.",
				output: []
			};

		}

		// Inserting the Section
		const result = await create_subscription({
			subscription_name,
			price,
			validity
		});

		console.log(result);

		return {
			returncode: 200,
			message: " Subscription Added",
			output: Array.isArray(result.output) ? result.output : [result.output as any]
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

