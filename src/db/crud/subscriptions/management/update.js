import db from "@/db/connector";

export async function update_subscription_status({
	subscription_id,
	status
}) {
	try {

		// Updating the record
		const result = await db.subscriptions.update({
			where: {
				id: subscription_id
			},
			data: {
				Status: status
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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
