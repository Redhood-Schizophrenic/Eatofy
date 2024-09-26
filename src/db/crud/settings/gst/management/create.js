import db from "@/db/connector";

// Without Image
export async function create_gst_settings({
	visibility,
	hotel_id,
	gst_percent
}) {
	try {

		// Inserting the Data
		const result = await db.gstSettings.create({
			data: {
				HotelId: hotel_id,
				Visibility: visibility,
				GSTPercent: gst_percent
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
