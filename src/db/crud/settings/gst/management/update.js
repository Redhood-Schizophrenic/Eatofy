import db from "@/db/connector";

// Details Update
export async function update_gst_settings({
	setting_id,
	visibility,
	gst_percent
}) {
	try {

		// Updating the record
		const result = await db.gstSettings.update({
			where: {
				id: setting_id
			},
			data: {
				Visibility: visibility,
				GSTPercent: gst_percent
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
