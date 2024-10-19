import db from "@/db/connector";

// Delete Hotels notifications
export async function delete_notifications({
	hotel_id,
}) {
	try {

		// Updating the record
		const result = await db.notifications.update({
			where: {
				HotelId: hotel_id
			},
			data: {
				Status: "Inactive"
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

// Details Update
export async function update_notification_status({
	hotel_id,
	status
}) {
	try {

		// Updating the record
		const result = await db.notifications.update({
			where: {
				HotelId: hotel_id
			},
			data: {
				Status: status
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
