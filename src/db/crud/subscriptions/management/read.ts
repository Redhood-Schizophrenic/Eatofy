import db from "@/db/connector";

export async function read_subscriptions() {
	try {

		const result = await db.subscriptions.findMany({
			where: {
				NOT:{
					Status: "Inactive"
				}
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Fetched",
			output: result
		};

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

interface SubscriptionInterface {
	subscription_name: string
}

export async function read_subscription({
	subscription_name
}: SubscriptionInterface) {
	try {

		const result = await db.subscriptions.findMany({
			where: {
				SubscriptionName: subscription_name,
				NOT:{
					Status: "Inactive"
				}
			},
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
			return {
				returncode: 400,
				message: "Subscription doesn't exist",
				output: result
			};
		}

		return {
			returncode: 200,
			message: "Data Fetched",
			output: result
		};

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

