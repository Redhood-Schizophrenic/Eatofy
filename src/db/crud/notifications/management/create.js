import db from "@/db/connector";

// Without Image
export async function create_notification({
	hotel_id,
	type,
	title,
	description
}) {
	try {

		// Inserting the Data
		const result = await db.notifications.create({
			data: {
				HotelId: hotel_id,
				Type: type,
				Title: title,
				Description: description
			},
		});
		visibility
		// Disconnect the Database
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
			output: result
		};

	} catch (error) {

		// Error thrown
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
