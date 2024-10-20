import db from "@/db/connector";

export async function read_notifications({
	hotel_id
}) {
	try {

		const result = await db.notifications.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: [
				{
					createdAt: "asc"
				}
			],

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
