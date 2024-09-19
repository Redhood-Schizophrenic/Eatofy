import db from "@/db/connector";

// Details Update
export async function update_dark_light_mode_settings({
	hotel_id,
	visibility
}) {
	try {

		// Updating the record
		const result = await db.darkModeSettings.update({
			where: {
				HotelId: hotel_id
			},
			data: {
				Visibility: visibility
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