import db from "@/db/connector";

export async function create_hotel_subscription ({
	is_valid,
	start_date,
	end_date,
	hotel_id,
	subscription_id
}){
	try {

		// Inserting the record
		const result = await db.hotel_Subscription.create({
			data: {
				isValid: is_valid,
				StartDate: start_date,
				EndDate: end_date,
				HotelId: hotel_id,
				SubscriptionId: subscription_id
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
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
