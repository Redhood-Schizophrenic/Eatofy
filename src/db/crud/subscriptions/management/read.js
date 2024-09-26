import db from "@/db/connector";

export async function read_subscriptions() {
	try {

		const result = await db.subscriptions.findMany({
			where: {
				NOT:{
					Status: "Inactive"
				}
			},
			orderBy: {
				SubscriptionName: "asc"
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Fetched",
			output: result
		};

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

export async function read_subscription({
	subscription_name
}) {
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
