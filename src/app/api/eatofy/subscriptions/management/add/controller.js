import { create_subscription } from "@/db/crud/subscriptions/management/create";
import { read_subscription } from "@/db/crud/subscriptions/management/read";

export async function add_subscription(data) {
	try {

		const subscription_name = data['subscription_name'];
		const price = data['price'];
		const validity = data['validity'];

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

		if (result.returncode == 200) {
			return {
				returncode: 200,
				message: " Subscription Added",
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
