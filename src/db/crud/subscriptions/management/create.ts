import db from "@/db/connector";

interface SubscriptionInterface {
	subscription_name: string,
	price: number,
	validity: number
}

export async function create_subscription ({
	subscription_name,
	price,
	validity
}: SubscriptionInterface){
	try {

		// Inserting the record
		const result = await db.subscriptions.create({
			data: {
				SubscriptionName: subscription_name,
				Price: price,
				Validity: validity
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
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
