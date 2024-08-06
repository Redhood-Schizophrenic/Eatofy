import db from "@/db/connector";

export async function fetch_dashboard() {
	try {

		const Hotels = await db.hotels.findMany();
		const HotelSubscriptions = await db.hotel_Subscription.findMany({
			include: {
				Hotel: true,
				Subscription: true
			}
		});

		db.$disconnect();

		return {
			returncode: 200,
			message: "Dashboard Data Fetched",
			output: [
				{
					"total_hotels": Hotels.length,
					"total_subscribed_hotels": HotelSubscriptions.length,
					"subscribed_hotels": HotelSubscriptions
				}

			]
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
};
