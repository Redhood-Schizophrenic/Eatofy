import db from "@/db/connector";

// Details Update
export async function update_vat_settings({
	hotel_id,
	visibility,
	vat_percent
}) {
	try {

		// Updating the record
		const result = await db.darkModeSettings.update({
			where: {
				HotelId: hotel_id
			},
			data: {
				Visibility: visibility,
				VATPercent: vat_percent
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
