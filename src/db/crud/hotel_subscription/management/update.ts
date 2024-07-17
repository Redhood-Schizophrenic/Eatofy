import db from "@/db/connector";

interface HotelSubscriptionStatusInterface {
	hotel_subscription_id: string,
	is_valid: boolean,
	status: string
}

export async function update_hotel_subscription_status({
	hotel_subscription_id,
	is_valid,
	status
}: HotelSubscriptionStatusInterface) {
	try {

		// Updating the record
		const result = await db.hotel_Subscription.update({
			where: {
				id: hotel_subscription_id
			},
			data: {
				Status: status,
				isValid: is_valid
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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
